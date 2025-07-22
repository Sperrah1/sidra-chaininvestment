if (!user.isVerified) {
  return res.status(401).json({ message: "Please verify your email before logging in." });
}
