import dbConnect from "../../../lib/db";
import User from "../../../models/User";

// ✅ Import your existing models
import Deposit from "../../../models/Deposit";
import Withdrawal from "../../../models/Withdrawal";
import Subscription from "../../../models/Subscription";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "Missing userId" });

  await dbConnect();

  try {
    const [deposits, withdrawals, subscriptions] = await Promise.all([
      Deposit.find({ userId }),
      Withdrawal.find({ userId }),
      Subscription.find({ userId }),
    ]);

    const formatted = [
      ...deposits.map(d => ({
        type: "deposit",
        amount: d.amount,
        date: d.depositedAt,
      })),
      ...withdrawals.map(w => ({
        type: "withdrawal",
        amount: w.amount,
        date: w.withdrawnAt,
      })),
      ...subscriptions.map(s => ({
        type: "subscription",
        amount: s.amount,
        date: s.subscribedAt,
        planName: s.planName,
        nextReturnDate: s.nextReturnDate,
        reinvested: s.reinvested,
      })),
    ];

    // Sort all transactions by date (newest first)
    formatted.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Transaction fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
