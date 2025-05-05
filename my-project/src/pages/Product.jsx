import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FaPlus, FaMinus } from "react-icons/fa";
import NavBar from "../components/NavBar";
import Announcement from "../components/Announcement";
import { publicRequest } from "../makeRequest";

const Product = () => {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [singleProduct, setSingleProduct] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...singleProduct, size, color, quantity }));
  };

  const handleAmount = (type) => {
    if (type === "desc") {
      quantity > 1 && setQuantity(prev => prev - 1);
    } else {
      setQuantity(prev => prev + 1);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await publicRequest.get(`/api/products/find/${id}`);
        setSingleProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <Announcement />
      
      {/* Product Container */}
      <div className="flex flex-col p-4 md:p-12 lg:flex-row lg:items-center">
        {/* Left Column - Image */}
        <div className="w-full max-w-md mx-auto lg:flex-1 lg:max-w-none lg:h-[80vh]">
          <img 
            src={singleProduct?.img} 
            alt={singleProduct?.title}
            className="w-full h-64 object-cover md:h-80 lg:h-full"
          />
        </div>

        {/* Right Column - Details */}
        <div className="mt-5 lg:flex-1 lg:pl-12 lg:mt-0">
          <h1 className="text-3xl font-light">{singleProduct?.title}</h1>
          <p className="my-5">{singleProduct?.desc}</p>
          <p className="text-4xl font-extralight">${singleProduct?.price}</p>

          {/* Color Selection */}
          <div className="flex items-center my-10">
            <span className="text-xl font-light mr-4">Color:</span>
            <div className="flex">
              {singleProduct.color?.map((c) => (
                <div
                  key={c}
                  onClick={() => setColor(c)}
                  className="w-5 h-5 rounded-full mx-1 cursor-pointer"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex items-center my-10">
            <span className="text-xl font-light mr-4">Size:</span>
            <select 
              onChange={(e) => setSize(e.target.value)}
              className="ml-2 p-2 border rounded"
            >
              {singleProduct.size?.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between my-10 w-full md:w-1/2">
            <div className="flex items-center">
              <FaMinus 
                onClick={() => handleAmount("desc")} 
                className="cursor-pointer text-gray-600 hover:text-black"
              />
              <span className="border border-teal-500 rounded-lg w-8 h-8 flex items-center justify-center mx-2">
                {quantity}
              </span>
              <FaPlus 
                onClick={() => handleAmount("inc")} 
                className="cursor-pointer text-gray-600 hover:text-black"
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-white border-2 border-teal-500 px-6 py-2 font-medium hover:bg-teal-50 transition-colors"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;