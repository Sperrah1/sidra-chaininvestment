import dbConnect from "../../lib/db";
import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  method: String,
  address: String,
});

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const wallets = await Wallet.find();
    return res.status(200).json(wallets);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
