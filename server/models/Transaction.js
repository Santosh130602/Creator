import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  purpose: String,
  type: { type: String, enum: ['earn', 'spend'] },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
