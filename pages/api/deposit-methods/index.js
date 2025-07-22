import dbConnect from "../../../lib/db";
import DepositMethod from "../../../models/DepositMethod";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const methods = await DepositMethod.find();
    return res.status(200).json(methods);
  }

  if (req.method === "POST") {
    const { method, address } = req.body;

    if (!method || !address) {
      return res.status(400).json({ message: "All fields required" });
    }

    await DepositMethod.findOneAndUpdate(
      { method },
      { address },
      { upsert: true }
    );

    return res.status(200).json({ message: "Deposit method updated" });
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
