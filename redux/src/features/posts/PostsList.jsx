import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostIds,
  getPostsStatus,
  getPostsError,
  fetchPosts,
 
} from "./postSlice";
import PostExcerpt from "./PostsExceprt";

const PostsList = () => {
  const dispatch = useDispatch();
  // const posts = useSelector(selectAllPosts);
  const orderedPostsIds = useSelector(selectPostIds)
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p className="text-xl">Loading...</p>;
  } else if (postStatus === "succeeded") {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));
    // content = orderedPosts.map((post) => (
    //   <PostExcerpt  key={post.id} post={post} />
    // ));
    content = orderedPostsIds.map(postId=>  <PostExcerpt key={postId} postId={postId}/>)
  } else if (postStatus === "failed") {
    content = <p className="text-xl">{error}</p>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <div className="posts-container grid grid-cols-4 gap-4">{content}</div>
    </section>
  );
};

export default PostsList;
