import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
const PostExcerpt = ({ postId}) => {
  

  const post = useSelector(state=>selectPostById(state,postId));
const postContent = post.content || post.body;
  return (
    <article className="w--full h-full bg-white rounded-xl overflow-hidden shadow-[0_5px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
      {/* Header with accent color */}
      <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {post.title || "Untitled Post"}
        </h3>
        
        <p className="text-gray-600 mb-5 text-sm line-clamp-4 flex-grow">
          {postContent.substring(0, 100)}
        </p>
        
        {/* Metadata */}
        <div className="mt-auto space-y-3">
          <div className="flex justify-between text-xs">
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                👤
              </span>
              <PostAuthor userId={post.id} />
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                📅
              </span>
              <TimeAgo timestamp={post.date} />
            </span>
          </div>
          
          {/* Action row */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <Link 
              to={`post/${post.id}`}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Read More
            </Link>
            <ReactionButtons post={post} />
          </div>
        </div>
      </div>
    </article>
  );
};



export default PostExcerpt;