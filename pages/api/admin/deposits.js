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

  if (req.method === "GET") {
    const deposits = await Deposit.find({ status: "pending" });
    return res.status(200).json(deposits);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
