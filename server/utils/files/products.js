const { v4: uuidv4 } = require('uuid');
const products = [
    {
      title: "Nike Sneakers",
      desc: `Premium Nike sneakers with cushioned soles - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
      categories: ["shoes", "sneakers"],
      size: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      color: ["black", "white", "blue"],
      price: 6250,
      inStock: true
    },
    {
      title: "White Knit Sweater",
      desc: `Soft and cozy knit sweater - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      categories: ["sweaters", "knitwear"],
      size: ["S", "M", "L", "XL"],
      color: ["white"],
      price: 3250,
      inStock: true
    },
    {
      title: "Denim Jeans",
      desc: `Classic slim-fit denim jeans - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1604176354204-9268737828e4",
      categories: ["pants", "jeans"],
      size: ["28", "30", "32", "34", "36"],
      color: ["blue"],
      price: 4250,
      inStock: true
    },
    {
      title: "Leather Backpack",
      desc: `Stylish genuine leather backpack - ${uuidv4()}`,
      img: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg",
      categories: ["bags", "backpacks"],
      size: ["One Size"],
      color: ["brown", "black"],
      price: 9000,
      inStock: true
    },
    {
      title: "Cotton Tote Bag",
      desc: `Eco-friendly reusable tote bag - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
      categories: ["bags", "totes"],
      size: ["One Size"],
      color: ["beige", "white", "black"],
      price: 1750,
      inStock: true
    },
    {
      title: "Silk Necktie",
      desc: `Elegant silk necktie for formal occasions - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
      categories: ["accessories", "ties"],
      size: ["One Size"],
      color: ["red", "blue", "black", "gray"],
      price: 2750,
      inStock: true
    },
    {
      title: "Canvas Sneakers",
      desc: `Lightweight canvas sneakers - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
      categories: ["shoes", "sneakers"],
      size: ["US 6", "US 7", "US 8", "US 9", "US 10"],
      color: ["white", "black", "navy"],
      price: 3500,
      inStock: true
    },
    {
      title: "Fun Outdoor Shoes",
      desc: `Vibrant outdoor adventure shoes - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
      categories: ["shoes", "outdoor"],
      size: ["US 7", "US 8", "US 9", "US 10"],
      color: ["multicolor", "blue", "green"],
      price: 4500,
      inStock: true
    },
    {
      title: "Loafers",
      desc: `Classic leather loafers - ${uuidv4()}`,
      img: "https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg",
      categories: ["shoes", "loafers"],
      size: ["US 7", "US 8", "US 9", "US 10"],
      color: ["brown", "black"],
      price: 5500,
      inStock: true
    },
    {
      title: "Running Shoes",
      desc: `Performance running shoes - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
      categories: ["shoes", "running"],
      size: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      color: ["black", "blue", "red"],
      price: 7000,
      inStock: true
    },
    {
      title: "Vans",
      desc: `Iconic Vans sneakers - ${uuidv4()}`,
      img: "https://images.pexels.com/photos/19090/pexels-photo.jpg",
      categories: ["shoes", "sneakers"],
      size: ["US 6", "US 7", "US 8", "US 9"],
      color: ["black", "white", "checkered"],
      price: 4500,
      inStock: true
    },
    {
      title: "Oxford Shoes",
      desc: `Timeless leather oxford shoes - ${uuidv4()}`,
      img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
      categories: ["shoes", "formal"],
      size: ["US 7", "US 8", "US 9", "US 10"],
      color: ["black", "brown"],
      price: 7500,
      inStock: true
    },
    {
      title: "Hiking Shoes",
      desc: `Durable outdoor hiking shoes - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      categories: ["shoes", "hiking"],
      size: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      color: ["brown", "gray", "green"],
      price: 8000,
      inStock: true
    },
    {
      title: "Athletic Sneakers",
      desc: `Versatile athletic training sneakers - ${uuidv4()}`,
      img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      categories: ["shoes", "sneakers", "athletic"],
      size: ["US 7", "US 8", "US 9", "US 10"],
      color: ["white", "black", "gray"],
      price: 5000,
      inStock: true
    },
    {
      title: "White T-shirt",
      desc: `Essential white cotton t-shirt - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9",
      categories: ["shirts", "basics"],
      size: ["S", "M", "L", "XL"],
      color: ["white"],
      price: 1250,
      inStock: true
    },
    {
      title: "All Weather Jacket",
      desc: `Versatile weather-resistant jacket - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      categories: ["outerwear", "jackets"],
      size: ["S", "M", "L", "XL"],
      color: ["black", "navy", "gray"],
      price: 9500,
      inStock: true
    },
    {
      title: "Unisex Backpack",
      desc: `Practical unisex everyday backpack - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      categories: ["bags", "backpacks"],
      size: ["One Size"],
      color: ["black", "gray", "blue"],
      price: 5000,
      inStock: true
    },
    {
      title: "Sweats",
      desc: `Comfortable cotton-blend sweatpants - ${uuidv4()}`,
      img: "https://images.pexels.com/photos/6311394/pexels-photo-6311394.jpeg",
      categories: ["pants", "activewear"],
      size: ["S", "M", "L", "XL"],
      color: ["black", "gray", "navy"],
      price: 3000,
      inStock: true
    },
    {
      title: "Knitten Sweater",
      desc: `Warm wool-blend knitted sweater - ${uuidv4()}`,
      img: "https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg",
      categories: ["sweaters", "knitwear"],
      size: ["S", "M", "L", "XL"],
      color: ["gray", "blue", "black"],
      price: 4000,
      inStock: true
    },
    {
      title: "Men's Hat",
      desc: `Classic cotton twill men's hat - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1534215754734-18e55d13e346",
      categories: ["accessories", "hats"],
      size: ["One Size"],
      color: ["black", "brown", "gray"],
      price: 2000,
      inStock: true
    },
    {
      title: "Men's Dress Shirt",
      desc: `Formal cotton dress shirt - ${uuidv4()}`,
      img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
      categories: ["shirts", "formal"],
      size: ["S", "M", "L", "XL"],
      color: ["white", "blue", "gray"],
      price: 3500,
      inStock: true
    }
  ];
  
  module.exports = products;