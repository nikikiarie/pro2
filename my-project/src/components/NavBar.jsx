import React from "react";
import { FaGlobe, FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSlice";

const NavBar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Search */}
          <div className="hidden md:flex items-center flex-1">
            <FaGlobe className="text-gray-600 mr-2" />
            <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 ml-4">
              <input
                type="text"
                placeholder="Search..."
                className="border-none outline-none px-2 w-32 sm:w-40 text-sm"
              />
              <FaSearch className="text-gray-500" />
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="flex-1 md:flex-none text-center">
            <Link to="/" className="no-underline">
              <h1 className="text-xl font-extrabold text-black hover:text-gray-700 transition-colors">
                SHOP.
              </h1>
            </Link>
          </div>

          {/* Right Section - Navigation */}
          <div className="flex items-center justify-end flex-1 space-x-4">
            {user?.isAdmin && (
              <Link
                to="/admin/home"
                className="hidden sm:inline-block text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
              >
                Admin
              </Link>
            )}

            {user ? (
              <>
                <span className="hidden sm:inline-block text-sm font-medium">
                  Hi, {user.username}
                </span>
                <button
                  onClick={() => {
                    dispatch(logOut());
                    navigate('/');
                  }}
                  className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors hidden sm:block"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  state={location}
                  className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors hidden sm:block"
                >
                  Login
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-xl text-gray-700 hover:text-teal-600 transition-colors" />
              {quantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {quantity}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens */}
        <div className="mt-2 md:hidden flex items-center border border-gray-300 rounded-md px-2 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none px-2 w-full text-sm"
          />
          <FaSearch className="text-gray-500" />
        </div>

        {/* Mobile Menu Links - Visible only on small screens */}
        {!user && (
          <div className="mt-2 flex justify-around md:hidden">
            <Link
              to="/register"
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/login"
              state={location}
              className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;