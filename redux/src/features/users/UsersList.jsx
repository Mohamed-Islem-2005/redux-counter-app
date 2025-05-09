import React from 'react'
import { selectAllUsers } from './usersSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom' // Changed from react-router

const UsersList = () => {
    const users = useSelector(selectAllUsers)

    return (
        <div className="max-w-4xl mx-auto p-6">
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
                    <h2 className="text-2xl font-bold text-white">Users</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                    {users.map(user => (
                        <li key={user.id} className="hover:bg-gray-50 transition-colors">
                            <Link 
                                to={`/user/${user.id}`} 
                                className="block px-6 py-4 text-lg text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-gray-900">{user.name}</p>
                                        <p className="text-sm text-gray-500">View profile →</p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                
                {users.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No users found
                    </div>
                )}
            </section>
        </div>
    )
}

export default UsersList