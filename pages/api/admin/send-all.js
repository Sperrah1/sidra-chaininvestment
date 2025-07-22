import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import sendEmail from "../../../utils/sendEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { subject, text } = req.body;

  if (!subject || !text) {
    return res.status(400).json({ message: "Subject and message are required" });
  }

  try {
    await dbConnect();
    const users = await User.find({});

    // Filter out users without emails
    const validUsers = users.filter(user => user.email);

    if (validUsers.length === 0) {
      return res.status(400).json({ message: "No valid email recipients found" });
    }

    // Send emails one by one or use Promise.all for parallel sending
    for (let user of validUsers) {
      await sendEmail({
        to: user.email,
        subject,
        text,
      });
    }

    res.status(200).json({ message: "Emails sent to all users successfully" });
  } catch (error) {
    console.error("Bulk email error:", error);
    res.status(500).json({ message: "Server error sending emails" });
  }
}
