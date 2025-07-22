import dbConnect from "../../../lib/db";
import mongoose from "mongoose";
import User from "../../../models/User";

// Models
const Deposit = mongoose.models.Deposit || mongoose.model("Deposit", new mongoose.Schema({
  userId: String,
  amount: Number,
  depositedAt: { type: Date, default: Date.now }
}));

const Withdrawal = mongoose.models.Withdrawal || mongoose.model("Withdrawal", new mongoose.Schema({
  userId: String,
  amount: Number,
  withdrawnAt: { type: Date, default: Date.now }
}));

const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", new mongoose.Schema({
  userId: String,
  planName: String,
  amount: Number,
  subscribedAt: { type: Date, default: Date.now }
}));

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "Missing userId" });

  await dbConnect();

  try {
    const [deposits, withdrawals, subscriptions] = await Promise.all([
      Deposit.find({ userId }),
      Withdrawal.find({ userId }),
      Subscription.find({ userId }),
    ]);

    const formatted = [
      ...deposits.map(d => ({
        type: "Deposit",
        amount: d.amount,
        date: d.depositedAt
      })),
      ...withdrawals.map(w => ({
        type: "Withdrawal",
        amount: w.amount,
        date: w.withdrawnAt
      })),
      ...subscriptions.map(s => ({
        type: `Subscribed to ${s.planName}`,
        amount: s.amount,
        date: s.subscribedAt
      }))
    ];

    // Sort all transactions by date (newest first)
    formatted.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Transaction fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
