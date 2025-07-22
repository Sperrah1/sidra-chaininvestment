import sendEmail from "../../utils/sendEmail";

export default async function handler(req, res) {
  try {
    await sendEmail({
      to: "receiver@gmail.com", // Replace with your test email
      subject: "Test Email from SIDRA-CHAIN",
      text: "This is a test email sent successfully from SIDRA-CHAIN.",
    });

    res.status(200).json({ message: "Test email sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
}
