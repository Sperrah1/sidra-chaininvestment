const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  referredBy: { type: String, default: null },
  balance: { type: Number, default: 0 },
  image: { type: String, default: "" },

  // Reset Password Fields
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
