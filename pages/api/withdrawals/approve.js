import dbConnect from "../../../lib/db";
import Withdrawal from "../../../models/Withdrawal";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.body;

  try {
    await dbConnect();

    await Withdrawal.findByIdAndUpdate(id, { status: "approved" });

    res.status(200).json({ message: "Withdrawal approved successfully." });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
