import dbConnect from "../../../lib/db";
import Chat from "../../../models/Chat";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { senderId, receiverId, message } = req.body;

    // Validate input
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Save chat message
    const chat = new Chat({ senderId, receiverId, message });
    await chat.save();

    // Emit real-time message if socket is connected
    global.io?.emit("newMessage", { senderId, receiverId, message });

    return res.status(201).json(chat);
  }

  if (req.method === "GET") {
    const { userId, otherUserId } = req.query;

    // Validate input
    if (!userId || !otherUserId) {
      return res.status(400).json({ message: "Missing user IDs" });
    }

    // Fetch chat history between the two users
    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 }); // sorted by creation time

    return res.status(200).json(messages);
  }

  // Method not allowed
  res.status(405).json({ message: "Method not allowed" });
}
