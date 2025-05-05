import React, { useState, useEffect } from "react";
import { useParams,useSearchParams, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiMail } from "react-icons/fi";
import { publicRequest } from "../makeRequest";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmailToken = async () => {
      // Get token and userId from URL query parameters
      const token = searchParams.get("token");
      const userId = searchParams.get("userId");

      // Validate parameters exist
      if (!token || !userId) {
        setStatus("error");
        setError("Invalid verification link - missing parameters");
        return;
      }

      try {
        setStatus("verifying");
        const response = await publicRequest.post("/api/auth/verify-email", {
          token,
          userId
        });

        if (response.data.success) {
          setStatus("success");
          setMessage(response.data.message || "Email verified successfully!");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("error");
          setError(response.data.message || "Verification failed");
        }
      } catch (err) {
        setStatus("error");
        setError(err.response?.data?.message || "Verification failed");
        console.error("Verification error:", err);
      }
    };

    verifyEmailToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-teal-600 py-4 px-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiMail className="inline-block" />
            Email Verification
          </h1>
        </div>

        <div className="p-6 space-y-4">
          {status === "verifying" && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mb-4"></div>
              <p className="text-gray-600">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center py-8">
              <FiCheckCircle className="text-5xl text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Verification Successful!
              </h2>
              <p className="text-gray-600 text-center mb-4">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecting to login page...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center py-8">
              <FiXCircle className="text-5xl text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-600 text-center mb-4">{error}</p>
              
              <button
                onClick={() => navigate("/register")}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Back to Registration
              </button>
            </div>
          )}

          <div className="text-center text-sm text-gray-600 mt-6">
            Need help?{" "}
            <a href="/contact" className="text-teal-600 font-medium hover:underline">
              Contact support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
