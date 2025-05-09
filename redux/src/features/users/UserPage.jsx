import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { selectPostsByUser } from "../posts/postSlice";  // Fixed import name
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  // Fixed selector usage - make sure the name matches your actual export
  const postsForUser = useSelector((state) => 
    selectPostsByUser(state, Number(userId))
  );

  return (
    <section className="max-w-4xl mx-auto p-6">
      {/* User Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-indigo-100">
                {postsForUser.length} {postsForUser.length === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Posts</h3>
        </div>
        
        {postsForUser.length > 0 ? (
          <ol className="divide-y divide-gray-200">
            {postsForUser.map(post => (
              <li key={post.id} className="hover:bg-gray-50 transition-colors">
                <Link 
                  to={`/post/${post.id}`} 
                  className="block px-6 py-4 hover:text-indigo-600 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                    </div>
                    <div>
                      <h4 className="text-base font-medium">{post.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {post.body.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No posts found for this user
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPage;