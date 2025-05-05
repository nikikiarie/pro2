import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from 'axios';
import { FiLoader } from "react-icons/fi";
import { publicRequest } from "../makeRequest";
import { useDispatch, useSelector } from "react-redux";
import { getProuctsStart } from "../redux/productSlice";

const Products = ({ cat }) => {
  const products = useSelector((state) => state.products.products);
  console.log(products)
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const res = await publicRequest.get(
          cat ? `/api/products?category=${cat}` : "/api/products"
        );
        dispatch(getProuctsStart(res.data));
        // setProducts(res.data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <section className="py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {cat ? `${cat.toUpperCase()} COLLECTION` : 'FEATURED PRODUCTS'}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FiLoader className="animate-spin text-4xl text-teal-600" />
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products found in this category.
        </div>
      )}
    </section>
  );
};

export default Products;