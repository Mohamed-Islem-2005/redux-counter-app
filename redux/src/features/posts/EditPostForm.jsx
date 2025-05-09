import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost,selectPostById,deletePost } from './postSlice';
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllUsers } from "../users/usersSlice";

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions }))

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ))

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Edit Post</h2>
  
  <form className="space-y-6">
    <div className="space-y-2">
      <label 
        htmlFor="postTitle" 
        className="block text-sm font-medium text-gray-700"
      >
        Post Title
      </label>
      <input
        type="text"
        id="postTitle"
        name="postTitle"
        value={title}
        onChange={onTitleChanged}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder="Enter post title"
      />
    </div>

    <div className="space-y-2">
      <label 
        htmlFor="postAuthor" 
        className="block text-sm font-medium text-gray-700"
      >
        Author
      </label>
      <select 
        id="postAuthor" 
        value={userId} 
        onChange={onAuthorChanged}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
      >
        <option value="">Select an author...</option>
        {usersOptions}
      </select>
    </div>

    <div className="space-y-2">
      <label 
        htmlFor="postContent" 
        className="block text-sm font-medium text-gray-700"
      >
        Content
      </label>
      <textarea
        id="postContent"
        name="postContent"
        value={content}
        onChange={onContentChanged}
        rows={8}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        placeholder="Write your post content here..."
      />
    </div>

    <div className="flex justify-end space-x-4 pt-4">
      <button
        type="button"
        onClick={onSavePostClicked}
        disabled={!canSave}
        className={`px-6 py-2 rounded-lg font-medium transition-all ${
          !canSave 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        Save Post
      </button>
      
      <button
        type="button"
        onClick={onDeletePostClicked}
        className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
      >
        Delete Post
      </button>
    </div>
  </form>
</section>
    )
}

export default EditPostForm