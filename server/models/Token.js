const mongoose = require("mongoose");

// tokenSchema.js
const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['email-verification', 'password-reset'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // 1 hour in seconds
  },
  usedAt: {
    type: Date,
    default: null
  }
});

// Add compound index to prevent multiple active tokens per user
tokenSchema.index({ userId: 1, type: 1 }, { unique: true, partialFilterExpression: { usedAt: null } });

module.exports = mongoose.model("Token", tokenSchema);