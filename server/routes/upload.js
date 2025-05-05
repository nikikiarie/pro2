// backend/routes/upload.js
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');

// Configure Cloudinary (add to your existing config)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate a secure upload signature
router.get('/signature', (req, res) => {
    console.log(req)
  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    timestamp,
    folder: 'user_uploads', // Optional: Organize uploads
  };

  // Generate signature using Cloudinary's method
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );
  console.log(signature);

  res.json({
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  });
});

module.exports = router;