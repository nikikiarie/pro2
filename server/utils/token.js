// // utils/tokenUtils.js
// const Token = require('../models/Token');
// const crypto = require('crypto');
// const path = require('path');
// const ejs = require('ejs');

// const generateToken = async (userId, type = 'email-verification') => {
//   // Delete any existing tokens of this type for the user
//   await Token.deleteMany({ userId, type });
  
//   const token = crypto.randomBytes(32).toString('hex');
  
//   const newToken = new Token({
//     userId,
//     token,
//     type
//   });

//   await newToken.save();
//   return token;
// };

// const verifyToken = async (userId, token, type = 'email-verification') => {
//   const tokenDoc = await Token.findOne({
//     userId,
//     token,
//     type,
//     usedAt: null,
//     createdAt: { $gt: new Date(Date.now() - 3600 * 1000) } // Within last hour
//   });

//   if (!tokenDoc) {
//     return { valid: false, message: 'Invalid or expired token' };
//   }

//   // Mark token as used
//   tokenDoc.usedAt = new Date();
//   await tokenDoc.save();

//   return { valid: true };
// };



// module.exports = { generateToken, verifyToken };
const Token = require('../models/Token');
const crypto = require('crypto');

const generateToken = async (userId, type = 'email-verification') => {
  // First check for existing unused token
  const existingToken = await Token.findOne({
    userId,
    type,
    usedAt: null,
    createdAt: { $gt: new Date(Date.now() - 3600 * 1000) } // Not expired
  });

  if (existingToken) {
    return existingToken.token; // Return existing token if valid
  }

  // Delete any expired or used tokens
  await Token.deleteMany({ 
    userId, 
    type,
    $or: [
      { usedAt: { $ne: null } },
      { createdAt: { $lte: new Date(Date.now() - 3600 * 1000) } }
    ]
  });

  const token = crypto.randomBytes(32).toString('hex');
  
  const newToken = new Token({
    userId,
    token,
    type
  });

  await newToken.save();
  return token;
};

const verifyToken = async (userId, token, type = 'email-verification') => {
  const tokenDoc = await Token.findOne({
    userId,
    token,
    type,
    usedAt: null,
    createdAt: { $gt: new Date(Date.now() - 3600 * 1000) } // Within last hour
  });

  if (!tokenDoc) {
    return { valid: false, message: 'Invalid or expired token' };
  }

  // Mark token as used
  tokenDoc.usedAt = new Date();
  await tokenDoc.save();

  return { valid: true };
};

module.exports = { generateToken, verifyToken };