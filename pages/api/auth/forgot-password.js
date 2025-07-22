import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import sendEmail from "../../../utils/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // You should generate a secure token here
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `Reset your password using this link: ${resetUrl}`,
    });

    return res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
