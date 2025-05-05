// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     products: [
//       {
//         productId: { type: String, required: true },
//         quantity:{type:Number,default:1}
//       }
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Cart", cartSchema);
// models/Payment.js
const mongoose = require("mongoose");
const crypto = require("crypto");

// Encryption key (store this securely in environment variables)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes
const IV_LENGTH = 16; // For AES, this is always 16

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    phoneNumberHash: { type: String }, // Hashed version
    phoneNumberEncrypted: { type: String }, // Encrypted version
    phoneNumberLast4: { type: String }, // For display purposes
    amount: { type: Number, required: true },
    // ... other fields
  },
  { timestamps: true }
);

// Encryption/Decryption methods
paymentSchema.methods.encryptPhoneNumber = function(phoneNumber) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc", 
    Buffer.from(ENCRYPTION_KEY), 
    iv
  );
  let encrypted = cipher.update(phoneNumber);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

paymentSchema.methods.decryptPhoneNumber = function() {
  if (!this.phoneNumberEncrypted) return null;
  const parts = this.phoneNumberEncrypted.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc", 
    Buffer.from(ENCRYPTION_KEY), 
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// Hash method (one-way)
paymentSchema.methods.hashPhoneNumber = function(phoneNumber) {
  return crypto
    .createHash("sha256")
    .update(phoneNumber + process.env.HASH_SALT)
    .digest("hex");
};

// Pre-save hook to handle phone number
paymentSchema.pre("save", function(next) {
  if (this.isModified("phoneNumber")) {
    // Store last 4 digits for display
    this.phoneNumberLast4 = this.phoneNumber.slice(-4);
    // Create hash for searching
    this.phoneNumberHash = this.hashPhoneNumber(this.phoneNumber);
    // Encrypt the full number
    this.phoneNumberEncrypted = this.encryptPhoneNumber(this.phoneNumber);
    // Don't store raw phone number
    this.phoneNumber = undefined;
  }
  next();
});

module.exports = mongoose.model("Payment", paymentSchema);