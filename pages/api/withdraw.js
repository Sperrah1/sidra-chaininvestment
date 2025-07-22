import dbConnect from "../../lib/db";
import mongoose from "mongoose";
import Withdrawal from "../../models/Withdrawal";
import sendEmail from "../../utils/sendEmail"; // Import the email utility

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, method, accountDetails, amount, email } = req.body;

  if (!userId || !method || !accountDetails || !amount || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await dbConnect();

    const withdrawal = new Withdrawal({
      userId,
      method,
      accountDetails,
      amount,
      status: "pending",
    });

    await withdrawal.save();

    // ✅ Send email notification to the user
    await sendEmail({
      to: email,
      subject: "Withdrawal Request Received",
      text: `Hello, your withdrawal request of $${amount} via ${method} has been received and is currently pending approval. Thank you!`,
    });

    res.status(201).json({ message: "Withdrawal request submitted successfully." });
  } catch (error) {
    console.error("Withdrawal error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
