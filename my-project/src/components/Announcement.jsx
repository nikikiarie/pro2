import React from 'react';

const Announcement = () => {
  return (
    <div className="h-8 bg-teal-600 flex items-center justify-center">
      <p className="text-white text-sm font-medium px-2 py-1 md:text-base animate-pulse">
        🎉 Super Deal! Free Shipping on Orders Over $50 🎉
      </p>
    </div>
  );
};

export default Announcement;