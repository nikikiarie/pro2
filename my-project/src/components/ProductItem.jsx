import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";

const ProductItem = ({ item }) => {
  return (
    <div className="relative flex-1 m-2 min-w-[280px] h-[350px] bg-gray-50 flex items-center justify-center group overflow-hidden">
      {/* Background Circle */}
      <div className="absolute w-[200px] h-[200px] bg-white rounded-full z-0"></div>

      {/* Product Image */}
      <img 
        src={item.img} 
        alt={item.title} 
        className="w-full h-full object-cover z-20 transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover Overlay with Actions */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <div className="flex gap-3">
          {/* Add to Cart */}
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-teal-100 transition-colors">
            <FiShoppingCart className="text-gray-700 text-lg" />
          </button>

          {/* View Details */}
          <Link 
            to={`/product/${item._id}`} 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-teal-100 transition-colors"
          >
            <FiSearch className="text-gray-700 text-lg" />
          </Link>

          {/* Add to Wishlist */}
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-teal-100 transition-colors">
            <FiHeart className="text-gray-700 text-lg" />
          </button>
        </div>
      </div>

      {/* Product Badges (optional) */}
      {item.isNew && (
        <div className="absolute top-4 right-4 bg-white text-teal-600 px-3 py-1 text-xs font-bold uppercase z-40">
          New
        </div>
      )}
    </div>
  );
};

export default ProductItem;