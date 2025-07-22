// models/Withdrawal.js
import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  method: String,
  details: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  requestedAt: { type: Date, default: Date.now },
  processedAt: Date,
}, { timestamps: true });

export default mongoose.models.Withdrawal || mongoose.model("Withdrawal", WithdrawalSchema);
