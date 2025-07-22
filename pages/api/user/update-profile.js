import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import nextConnect from "next-connect";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  try {
    await dbConnect();
    const { userId, name } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name;

    if (req.file) {
      // Convert image buffer to base64
      user.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
