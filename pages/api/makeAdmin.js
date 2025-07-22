// pages/api/makeAdmin.js
import dbConnect from "../../lib/db";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: "User promoted to admin successfully" });
  } catch (error) {
    console.error("Error promoting user to admin:", error);
    res.status(500).json({ message: "Server error" });
  }
}
