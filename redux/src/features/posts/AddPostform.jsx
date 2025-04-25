import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);


 
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  // Only enable save if all required fields are filled
  const canSave =[title, content, userId].every(Boolean) && addRequestStatus === "idle";
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, content,  userId }))
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  
  return (
    <section className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add a New Post</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="postTitle" className="block text-lg font-medium">
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="w-full p-2 border-2 border-gray-300 rounded-lg mt-2"
            placeholder="Enter post title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postAuthor" className="block text-lg font-medium">
            Author:
          </label>
          <select
            id="postAuthor"
            value={userId}
            onChange={onAuthorChanged}
            className="w-full p-2 border-2 border-gray-300 rounded-lg mt-2"
          >
            <option value="">Select Author</option>
            {userOptions}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="postContent" className="block text-lg font-medium">
            Content:
          </label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            className="w-full p-2 border-2 border-gray-300 rounded-lg mt-2"
            placeholder="Enter post content"
            rows={4}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className={`px-6 py-2 text-white font-semibold rounded-lg transition duration-300 ${
              canSave 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;