// pages/api/wallets/index.js
import dbConnect from "../../../lib/db";
import Wallet from "../../../models/Wallet";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const wallets = await Wallet.find();
    return res.status(200).json(wallets);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
