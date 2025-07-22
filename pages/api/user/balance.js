// pages/api/user/balance.js
import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing user ID" });
  }

  try {
    await dbConnect();

    // Check both _id and email
    const user = await User.findOne({
      $or: [{ _id: userId }, { email: userId }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Server error" });
  }
}
