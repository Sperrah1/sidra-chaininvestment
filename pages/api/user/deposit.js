import dbConnect from "../../../lib/db";
import mongoose from "mongoose";
import User from "../../../models/User";
import sendEmail from "../../../utils/sendEmail";

const depositSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  method: String,
  status: { type: String, default: "pending" },
  requestedAt: { type: Date, default: Date.now },
});

const Deposit = mongoose.models.Deposit || mongoose.model("Deposit", depositSchema);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, amount, method } = req.body;

  if (!userId || !amount || !method) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await dbConnect();

    const deposit = new Deposit({ userId, amount, method });
    await deposit.save();

    // Send email notification to admin
    await sendEmail({
      to: "admin@gmail.com", // ✅ Replace with your admin email
      subject: "New Deposit Request",
      text: `User ${userId} has requested a deposit of $${amount} via ${method}. Please review and approve it in the admin panel.`,
    });

    return res.status(201).json({ message: "Deposit request submitted successfully" });
  } catch (error) {
    console.error("Deposit error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
