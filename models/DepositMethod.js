import mongoose from "mongoose";

const depositMethodSchema = new mongoose.Schema({
  method: { type: String, required: true }, // e.g. "USDT", "Litecoin"
  address: { type: String, required: true }, // wallet address or bank account
});

export default mongoose.models.DepositMethod || mongoose.model("DepositMethod", depositMethodSchema);
