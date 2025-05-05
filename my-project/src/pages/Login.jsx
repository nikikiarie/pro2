import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userSlice";
import { publicRequest } from "../makeRequest";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.state?.pathname;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await publicRequest.post("/api/auth/login", credentials);
      console.log(res)
      dispatch(loginSuccess(res.data));
      pathname ? navigate(pathname) : navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setIsSubmitting(false);
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiLogIn className="inline-block" />
            Sign In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              onChange={handleInputChange}
              value={credentials.username}
              required
            />
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              onChange={handleInputChange}
              value={credentials.password}
              required
            />
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a 
              href="#" 
              className="text-sm text-teal-600 hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
              isSubmitting ? "bg-teal-400" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-teal-600 font-medium hover:underline"
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;