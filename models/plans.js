// models/Plan.js
import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planType: {
    type: String,
    enum: ["basic", "premium", "enterprise"],
    required: true,
  },
  amount: Number,
  startDate: {
    type: Date,
    default: Date.now,
  },
  nextPayoutDate: Date,
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
});

export default mongoose.models.Plan || mongoose.model("Plan", planSchema);
