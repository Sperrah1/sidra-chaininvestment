// models/Withdrawal.js
// models/Withdrawal.js
import mongoose from 'mongoose';

const WithdrawalSchema = new mongoose.Schema({
  amount: Number,
  user: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Withdrawal || mongoose.model('Withdrawal', WithdrawalSchema);
