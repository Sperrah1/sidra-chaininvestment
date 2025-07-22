// models/Subscription.js
import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    nextReturnDate: { // ✅ Correctly placed
      type: Date,
      required: true,
    },
    reinvested: { // ✅ Correctly placed
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);
