import React from "react";
import { useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const ProductList = () => {
  const { cat } = useParams();

  return (
    <div className="min-h-screen">
      <NavBar />
      <Announcement />
      
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold mx-5 my-6 capitalize">
        {cat || 'Products'}
      </h1>

      {/* Filters Section */}
      <div className="flex flex-col justify-between px-5 mb-8 md:flex-row">
        {/* Filter Options */}
        <div className="flex items-center mb-4 md:mb-0">
          <span className="mr-5 text-lg font-semibold">Filter Products:</span>
          <select className="mr-5 p-2 border rounded">
            <option disabled defaultValue>Color</option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>
          <select className="p-2 border rounded">
            <option disabled defaultValue>Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center">
          <span className="mr-5 text-lg font-semibold">Sort Products:</span>
          <select className="p-2 border rounded">
            <option defaultValue>Newest</option>
            <option>Price (asc)</option>
            <option>Price (desc)</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <Products cat={cat} />

      {/* Newsletter & Footer */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductList;