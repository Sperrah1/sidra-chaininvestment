import dbConnect from "../../../lib/db";
import Withdrawal from "../../../models/Withdrawal";
import User from "../../../models/User";
import sendEmail from "../../../utils/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { withdrawalId } = req.body;
  if (!withdrawalId) return res.status(400).json({ message: "Withdrawal ID is required" });

  try {
    await dbConnect();

    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) return res.status(404).json({ message: "Withdrawal not found" });

    if (withdrawal.status !== "pending") {
      return res.status(400).json({ message: `Cannot approve a withdrawal that is ${withdrawal.status}` });
    }

    withdrawal.status = "approved";
    withdrawal.processedAt = new Date();
    await withdrawal.save();

    const user = await User.findOne({ email: withdrawal.userId });
    if (user) {
      await sendEmail({
        to: user.email,
        subject: "Your Withdrawal is Approved",
        text: `Hello ${user.name},

Your withdrawal request of USD ${withdrawal.amount} via ${withdrawal.method} has been approved and processed successfully on ${new Date().toLocaleDateString()}.

Thank you,
SIDRA-CHAIN`
      });
    }

    res.status(200).json({ message: "Withdrawal approved and email sent" });
  } catch (err) {
    console.error("Approve-withdrawal error:", err);
    res.status(500).json({ message: "Server Error" });
  }
}
