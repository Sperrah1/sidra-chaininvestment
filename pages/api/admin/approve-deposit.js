import dbConnect from '../../../lib/dbConnect';
import Deposit from '../../../models/Deposit';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { depositId } = req.body;

    try {
      const deposit = await Deposit.findById(depositId);
      if (!deposit) return res.status(404).json({ message: 'Deposit not found' });
      if (deposit.status === 'approved') return res.status(400).json({ message: 'Deposit already approved' });

      // Approve deposit
      deposit.status = 'approved';
      await deposit.save();

      // Update user balance
      const user = await User.findById(deposit.userId);
      user.walletBalance += deposit.amount;
      await user.save();

      return res.status(200).json({ success: true, message: 'Deposit approved successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
s