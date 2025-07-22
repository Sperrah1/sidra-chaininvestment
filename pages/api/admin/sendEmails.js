import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import sendEmail from "../../../utils/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { subject, message } = req.body;

  if (!subject || !message) return res.status(400).json({ message: "Missing subject or message" });

  try {
    await dbConnect();

    // Get all user emails
    const users = await User.find({});
    const emails = users.map((u) => u.email);

    if (emails.length === 0) return res.status(400).json({ message: "No recipients found" });

    // Send emails one by one (or improve later with bulk support)
    for (let email of emails) {
      await sendEmail({
        to: email,
        subject,
        text: message,
      });
    }

    return res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Bulk email error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
