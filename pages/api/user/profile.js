export default function handler(req, res) {
  try {
    const user = {
      username: 'John Doe',
      email: 'john@example.com',
      profilePicture: '/default-avatar.png',
    };

    return res.status(200).json({ user });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
}

