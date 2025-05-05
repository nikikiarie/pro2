
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiMail } from "react-icons/fi";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const error = searchParams.get("error");
  const success = searchParams.get("success");
  const message = searchParams.get("message");

  // Auto-redirect on success
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

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
          {success ? (
            <div className="flex flex-col items-center justify-center py-8">
              <FiCheckCircle className="text-5xl text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Verification Successful!
              </h2>
              <p className="text-gray-600 text-center mb-4">
                {message || "Email verified successfully!"}
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to login page...
              </p>
            </div>
          ) : error ? (
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
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mb-4"></div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
