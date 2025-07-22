import mongoose from "mongoose";

const DepositSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  depositedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Deposit || mongoose.model("Deposit", DepositSchema);
