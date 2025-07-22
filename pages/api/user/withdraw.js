import sendEmail from '../../../utils/sendEmail';

// After successfully saving the withdrawal:
await sendEmail({
  to: user.email,
  subject: 'Withdrawal Request Submitted',
  text: `Hello ${user.name}, your withdrawal request of $${amount} has been submitted and is being processed.`
});
