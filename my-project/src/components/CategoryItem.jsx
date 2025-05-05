import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="relative m-1 w-full h-[300px] overflow-hidden group md:h-[70vh] md:flex-1">
      <Link to={`/products/${item.cat}`} className="block w-full h-full">
        {/* Image with hover zoom effect */}
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay with gradient and content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md md:text-3xl lg:text-4xl">
            {item.title}
          </h2>
          <button className="px-6 py-2 bg-white text-gray-800 font-medium rounded-none hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">
            SHOP NOW
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;