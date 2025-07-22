import dbConnect from "../../../lib/db";
import Subscription from "../../../models/Subscription";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.query;

  try {
    await dbConnect();
    const subscriptions = await Subscription.find({ userId });
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Fetch subscriptions error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
