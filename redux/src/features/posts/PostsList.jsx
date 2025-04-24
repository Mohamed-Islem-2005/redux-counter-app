import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import TimeAgo from './TimeAgo';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
const Posts = () => {
  const posts = useSelector(selectAllPosts);

  const ordredPosts = posts.slice().sort((a,b) =>b.date.localeCompare(a.date));
    const renderedPosts = ordredPosts.map((post) => (
    <article key={post.id} className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg">
       
      <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
      <p className="text-gray-600 mt-2">
        {post.content ? post.content.substring(0, 100) : "No content available"}...
      </p>
      <p className='postCredit'>
        <PostAuthor userId={post.userId} /> 
        <TimeAgo timestamp={post.date} /> 
      </p>
      <ReactionButtons  post={post} />
    </article>


  ));

  return (
    
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
      <h2 className="text-4xl font-bold mb-6">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderedPosts.length ? renderedPosts : <p className="text-xl">No posts available</p>}
      </div>
  
    </section>
  );
};

export default Posts;
