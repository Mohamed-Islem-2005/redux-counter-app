import { selectPostById } from "./postSlice";
import { useSelector } from "react-redux";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router";
import React from 'react'
import { Link } from "react-router";

const SinglePostPage = () => {
    const {postId} = useParams()
    const post = useSelector((state)=>selectPostById(state,Number(postId)))
    if(!post){
        return(
            <section>
                <h2>Post not Found</h2>
            </section>
        )
    }
    return (
        <article className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <Link 
              to={`/post/edit/${post.id}`}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Edit Post
            </Link>
          </div>
      
          {/* Post Content */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {post.body}
          </p>
      
          {/* Post Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <PostAuthor userId={post.userId} />
              </div>
              <span className="text-sm text-gray-400">•</span>
              <TimeAgo timestamp={post.date} className="text-sm text-gray-500" />
            </div>
            
            <ReactionButtons post={post} />
          </div>
        </div>
      </article>
  )
}

export default SinglePostPage
