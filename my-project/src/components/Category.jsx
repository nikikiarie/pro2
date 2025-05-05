import React from "react";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Category = () => {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-center py-5 text-gray-800">
        Shop by Categories
      </h1>
      <div className="flex flex-col items-center gap-4 px-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-between">
        {categories.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Category;