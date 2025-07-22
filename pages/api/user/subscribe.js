import sendEmail from '../../../utils/sendEmail';

// After successfully saving the subscription:
await sendEmail({
  to: user.email,
  subject: 'Investment Plan Subscription',
  text: `Hello ${user.name}, you have successfully subscribed to the ${planName} plan with an investment of $${amount}.`
});
