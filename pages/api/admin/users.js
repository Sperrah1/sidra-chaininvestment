// pages/api/admin/users.js
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || !session.user.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!session || !session.user.isAdmin) {
  return {
    redirect: { destination: "/login", permanent: false },
  };
}


  try {
    await dbConnect();
    const users = await User.find({}, "name email balance isAdmin"); // You can exclude password this way
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
}

