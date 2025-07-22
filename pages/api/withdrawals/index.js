import dbConnect from "../../../lib/db";
import Withdrawal from "../../../models/Withdrawal";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect();

    const withdrawals = await Withdrawal.find({ status: "pending" });

    res.status(200).json(withdrawals);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
