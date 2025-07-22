import sendEmail from '../../utils/sendEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { to, subject, message } = req.body;

  try {
    await sendEmail({ to, subject, text: message });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send email.' });
  }
}
