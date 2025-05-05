// Complete Product Populator with UUID
require('dotenv').config();
const mongoose = require('mongoose');
const products = require('./files/products'); // Assuming products.json is in the same directory
const { v2: cloudinary } = require('cloudinary');
const axios = require('axios');
const Product = require('../models/Product');

// Configure mongoose
mongoose.set('strictQuery', false);

// ====================== 
// 1. CLOUDINARY SETUP
// ======================
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dfm1odvv4', 
  api_key: process.env.CLOUDINARY_API_KEY || '393599637663317', 
  api_secret: process.env.CLOUDINARY_API_SECRET || 'gJ_7aXiXPUuZajwRREmCb_fqCYQ'
});



// ====================== 
// 3. IMAGE HANDLING FUNCTIONS
// ======================
async function downloadImage(url) {
  try {
    // Fix common URL issues
    url = url.replace(/^\/\//, 'https://');
    
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 15000
    });
    return response.data;
  } catch (err) {
    console.error(`Download failed for ${url}:`, err.message);
    return null;
  }
}

async function uploadToCloudinary(imageBuffer) {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
      { 
        folder: "ecommerce-prod",
        quality: "auto",
        fetch_format: "auto"
      }
    );
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err.message);
    return null;
  }
}

// ====================== 
// 4. MAIN POPULATION FUNCTION
// ======================
async function populateProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🧹 Cleared previous products');

    // Process each product
    for (const [index, product] of products.entries()) {
      try {
        console.log(`\n🔄 Processing ${index + 1}/${products.length}: ${product.title}`);
        
        // Download and upload image
        const imageData = await downloadImage(product.img);
        if (!imageData) {
          console.log('⚠️ Using placeholder image due to download failure');
          product.img = 'https://via.placeholder.com/500';
        } else {
          const cloudinaryUrl = await uploadToCloudinary(imageData);
          if (cloudinaryUrl) product.img = cloudinaryUrl;
        }

        // Create product with UUID in description
        await Product.create(product);
        console.log(`✅ Saved: ${product.title}`);

      } catch (err) {
        console.error(`❌ Failed to process "${product.title}":`, err.message);
      }
    }

    // Verification
    const count = await Product.countDocuments({});
    console.log(`\n🎉 Success: ${count}/${products.length} products inserted`);
    const sample = await Product.findOne({});
    console.log('Sample product:', {
      title: sample.title,
      desc: sample.desc,
      img: sample.img ? '...uploaded...' : null
    });

  } catch (err) {
    console.error('❌ Fatal error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🚪 MongoDB connection closed');
  }
}

// Execute
populateProducts();