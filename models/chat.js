import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);
