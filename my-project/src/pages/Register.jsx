import React, { useState } from "react";
import { FiUpload, FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../makeRequest";

const Register = () => {
  const navigate = useNavigate();
  
  // Form data state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    image: null,
    password: "",
    confirmPassword: ""
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const uploadToCloudinary = async (file) => {
    try {
      const { data: signatureData } = await publicRequest.get('/api/upload/signature');
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signatureData.api_key);
      formData.append('timestamp', signatureData.timestamp);
      formData.append('signature', signatureData.signature);
      formData.append('folder', 'user_uploads');

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${signatureData.cloud_name}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );
      return response.data.secure_url;
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      // Upload image if exists
      let imgUrl = null;
      if (formData.image) {
        imgUrl = await uploadToCloudinary(formData.image);
      }

      // Prepare user data for registration
      const { image, confirmPassword, ...userData } = formData;
      const userToRegister = {
        ...userData,
        img: imgUrl || ""
      };

      // Register user
      const response = await publicRequest.post("/api/auth/register", userToRegister);
      
      // Show success message
      setSuccess(response.data.message || "Registration successful! Please check your email to verify your account.");

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        image: null,
        password: "",
        confirmPassword: ""
      });
      setUploadProgress(0);
      
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiUserPlus className="inline-block" />
            Create Account
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                name="firstname"
                placeholder="First name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                name="lastname"
                placeholder="Last name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Username */}
          <div className="relative">
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
              minLength={3}
            />
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
                minLength={6}
              />
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            <div className="relative">
              <input
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <label className="flex flex-col items-center cursor-pointer">
              <FiUpload className="text-2xl text-teal-600 mb-2" />
              <span className="text-sm font-medium text-gray-600">
                {formData.image
                  ? formData.image.name
                  : "Upload Profile Picture (Optional)"}
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-teal-600 h-2 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1 block">
                  Uploading: {uploadProgress}%
                </span>
              </div>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-teal-300"
                required
              />
            </div>
            <label className="ml-2 text-sm text-gray-600">
              I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
              isLoading ? "bg-teal-400" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Register Now"
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-50 text-green-600 rounded-lg text-md text-center font-semibold">
              <p>{success}</p>
              {/* <div className="mt-2 flex justify-between items-center">
                <button
                  type="button"
                  className="text-teal-600 font-medium hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              </div> */}
            </div>
          )}

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 font-medium hover:underline">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
