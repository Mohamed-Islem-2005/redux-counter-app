import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, getCount } from "../features/posts/postSlice";
const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 uppercase tracking-wider mb-4 md:mb-0">
          Redux Blog
        </h1>

        <nav className="w-full md:w-auto">
          <ul className="flex space-x-1 md:space-x-4 justify-center md:justify-end">
            <li>
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/post"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                Posts
              </Link>
              <Link
                to="/user"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                Users
              </Link>
            </li>
          </ul>
          <button  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
            onClick={() => {
              dispatch(increaseCount());
            }}
          >
            {count}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
