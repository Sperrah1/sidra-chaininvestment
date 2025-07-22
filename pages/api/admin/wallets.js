import dbConnect from "../../../lib/db";
import Wallet from "../../../models/Wallet";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { method, address } = req.body;
    if (!method || !address) return res.status(400).json({ message: "All fields required" });

    await Wallet.create({ method, address });
    return res.status(201).json({ message: "Wallet added" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await Wallet.findByIdAndDelete(id);
    return res.status(200).json({ message: "Wallet deleted" });
  }

  if (req.method === "PUT") {
    const { id, method, address } = req.body;
    await Wallet.findByIdAndUpdate(id, { method, address });
    return res.status(200).json({ message: "Wallet updated" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

