const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    productId: String,
    title: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'],
    default: 'pending' 
  },
  mpesaReceipt: String,
  phoneNumber: String,
  checkoutRequestId: { type: String, unique: true }, // From M-Pesa
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Order", orderSchema);
