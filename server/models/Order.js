const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true}.
  items: [{
    productId: String,
    title: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: { 
    type: String, 
    default: 'pending' // Only tracking pending/paid status
  },
  mpesaReceipt: String,
  phoneNumber: String
}, { timestamps: true });


module.exports = mongoose.model("Order", orderSchema);
