import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
          Newsletter
        </h2>
        
        {/* Subtitle */}
        <p className="text-base md:text-xl text-gray-600 mb-8 max-w-2xl">
          Get timely updates from your favorite products
        </p>

        {isSubscribed ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-4 rounded">
            <p>Thank you for subscribing! 🎉</p>
            <button 
              onClick={() => setIsSubscribed(false)}
              className="mt-2 text-sm text-green-600 hover:text-green-800"
            >
              Subscribe again
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="w-full max-w-md flex shadow-lg rounded-lg overflow-hidden"
          >
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-6 py-4 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 flex items-center justify-center ${
                isLoading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'
              } text-white transition-colors duration-300`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FiSend className="text-xl" />
              )}
            </button>
          </form>
        )}

        {/* Privacy Note */}
        <p className="mt-4 text-xs text-gray-500 max-w-md">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;