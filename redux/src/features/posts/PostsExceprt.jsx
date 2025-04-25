import React from "react";


import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";


const PostExcerpt = ({ post }) => {
 

  // Handle case where content might be undefined
  const postContent = post.content || post.body ;

  return (
    <article className="post-excerpt p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      {post.title || "Untitled Post"}
    </h3>
    <p className="post-content text-sm text-gray-600 mb-4">
      {postContent.substring(0, 100)}
    </p>
    <div className="post-meta text-xs text-gray-500 flex justify-between items-center mb-4">
      <span>👤{<PostAuthor userId={post.id}/>}</span>
      <span>📅 {<TimeAgo timestamp={post.date}/>}</span>
    </div>
    <div className="reactions flex space-x-2">
  <ReactionButtons post={post}/>
    </div>
  </article>
  
  );
};

export default PostExcerpt;