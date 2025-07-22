import dbConnect from "../../lib/db";
import mongoose from "mongoose";
import User from "../../models/User";

const depositSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  method: String,
  depositedAt: { type: Date, default: Date.now },
});

const Deposit = mongoose.models.Deposit || mongoose.model("Deposit", depositSchema);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, amount, method } = req.body;

  if (!userId || !amount || !method) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await dbConnect();

    const deposit = new Deposit({ userId, amount, method });
    await deposit.save();

    // Update user's wallet balance
    await User.findOneAndUpdate(
      { email: userId }, // assuming userId is the email
      { $inc: { balance: amount } }
    );

    res.status(201).json({ message: "Deposit successful" });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
