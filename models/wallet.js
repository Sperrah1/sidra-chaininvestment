import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  method: String,
  address: String,
});

export default mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);
