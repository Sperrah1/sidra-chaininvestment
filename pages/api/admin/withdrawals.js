// pages/api/admin/withdrawals.js
import dbConnect from "../../../lib/db";
import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  method: String,
  details: String,
  status: { type: String, default: "pending" },
  requestedAt: { type: Date, default: Date.now },
});

const Withdrawal = mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalSchema);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // ✅ Return all withdrawals (including pending and approved)
      const withdrawals = await Withdrawal.find().sort({ requestedAt: -1 });
      return res.status(200).json(withdrawals); // Return the array directly
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      await Withdrawal.findByIdAndUpdate(id, { status: "approved" });
      return res.status(200).json({ message: "Withdrawal approved" });
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
