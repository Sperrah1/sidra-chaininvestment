import dbConnect from "../../../lib/db";
import mongoose from "mongoose";

const depositSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  method: String,
  status: { type: String, default: "pending" },
  requestedAt: { type: Date, default: Date.now },
});

const Deposit = mongoose.models.Deposit || mongoose.model("Deposit", depositSchema);

export default async function handler(req, res) {
  await dbConnect();

  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "Missing user ID" });

  try {
    const deposits = await Deposit.find({ userId });
    return res.status(200).json(deposits);
  } catch (error) {
    console.error("Fetch deposits error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
