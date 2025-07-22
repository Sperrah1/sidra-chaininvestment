import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  const { token, email } = req.query;

  if (!token || !email) return res.status(400).json({ message: "Invalid verification link" });

  const user = await User.findOne({ email, verificationToken: token });

  if (!user) return res.status(400).json({ message: "Verification failed" });

  user.isVerified = true;
  user.verificationToken = null;

  await user.save();

  return res.status(200).json({ message: "Email verified successfully. You can now login." });
}
