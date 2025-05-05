import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Left Section */}
          <div className="md:flex-1">
            <h1 className="text-2xl font-extrabold mb-4">SHOP</h1>
            <p className="mb-6 text-gray-600">
              There are many variations of passages of Lorem Ipsum available, but
              the majority have suffered alteration in some form, by injected
              humour, or randomised words which don't look even slightly believable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          {/* Center Section */}
          <div className="md:flex-1">
            <h3 className="text-xl font-semibold mb-4 mt-6 md:mt-0">Useful Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="hover:underline hover:text-teal-600 transition-colors">Home</a>
              <a href="#" className="hover:underline hover:text-teal-600 transition-colors">Products</a>
              <a href="#" className="hover:underline hover:text-teal-600 transition-colors">Users</a>
              <a href="#" className="hover:underline hover:text-teal-600 transition-colors">Favourites</a>
              <a href="#" className="hover:underline hover:text-teal-600 transition-colors">About Us</a>
              <a href="#" className="hover:underline hover:text-teal-600 transition-colors">Contact</a>
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="md:flex-1">
            <h3 className="text-xl font-semibold mb-4 mt-6 md:mt-0">Newsletter</h3>
            <p className="mb-4 text-gray-600">Subscribe for updates and promotions</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button className="bg-teal-600 text-white px-4 py-2 hover:bg-teal-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} SHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;