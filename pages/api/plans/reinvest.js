// pages/api/plans/reinvest.js
// pages/api/plans/reinvest.js
import dbConnect from "../../../lib/db";
import Subscription from "../../../models/Subscription";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { userId, subscriptionId } = req.body;

  if (!userId || !subscriptionId) {
    return res.status(400).json({ message: "Missing required field" });
  }

  try {
    await dbConnect();

    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    let nextReturnDate = new Date();

    if (subscription.planName === "BASIC PLAN") nextReturnDate.setDate(nextReturnDate.getDate() + 3);
    else if (subscription.planName === "ADVANCED PLAN") nextReturnDate.setDate(nextReturnDate.getDate() + 7);
    else if (subscription.planName === "PREMIUM PLAN") nextReturnDate.setDate(nextReturnDate.getDate() + 30);
    else if (subscription.planName === "PROMO PLAN") nextReturnDate.setDate(nextReturnDate.getDate() + 2);
    else return res.status(400).json({ message: "Invalid plan name" });

    const newSubscription = new Subscription({
      userId,
      planName: subscription.planName,
      amount: subscription.amount,
      nextReturnDate,
    });

    await newSubscription.save();

    return res.status(201).json({ message: "Reinvestment successful" });
  } catch (error) {
    console.error("Reinvestment error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
