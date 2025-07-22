// pages/api/admin/add-balance.js
import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.balance += parseFloat(amount);
    await user.save();

    return res.status(200).json({ message: "Balance added successfully" });
  } catch (error) {
    console.error("Balance update error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
