import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['initiated', 'completed', 'failed'], default: 'initiated' },
  reference: { type: String, unique: true },
  mpesaRequestId: String,
  checkoutRequestId: String
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
