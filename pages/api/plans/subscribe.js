// pages/api/plans/subscribe.js
import dbConnect from "../../../lib/db";
import Subscription from "../../../models/Subscription";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { userId, planName, amount } = req.body;

  if (!userId || !planName || !amount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await dbConnect();

    let nextReturnDate = new Date();

    // ✅ Match plan names correctly (they must match exactly with the plans page)
    if (planName === "Basic Plan") nextReturnDate.setDate(nextReturnDate.getDate() + 3);
    else if (planName === "Advanced Plan") nextReturnDate.setDate(nextReturnDate.getDate() + 7);
    else if (planName === "Premium Plan") nextReturnDate.setDate(nextReturnDate.getDate() + 30);
    else if (planName === "Promo Plan") nextReturnDate.setDate(nextReturnDate.getDate() + 2);
    else return res.status(400).json({ message: "Invalid plan name" });

    // ✅ Check if user has enough balance
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // ✅ Deduct investment amount from user balance
    user.balance -= amount;
    await user.save();

    // ✅ Save subscription
    const subscription = new Subscription({
      userId,
      planName,
      amount,
      nextReturnDate,
    });

    await subscription.save();

    return res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
