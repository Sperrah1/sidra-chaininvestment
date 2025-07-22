import formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "../../../lib/mongodb";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = new formidable.IncomingForm({ multiples: false });
  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res.status(500).json({ message: "Error parsing form data" });
    }

    const file = files.avatar;
    const email = fields.email;

    if (!file || !email) {
      return res.status(400).json({ message: "Missing file or email" });
    }

    const fileName = `${Date.now()}_${file.originalFilename}`;
    const newPath = path.join(uploadDir, fileName);

    fs.renameSync(file.filepath, newPath);
    const avatarUrl = `/uploads/${fileName}`;

    try {
      const { db } = await connectToDatabase();
      await db.collection("users").updateOne({ email }, { $set: { avatar: avatarUrl } });

      return res.status(200).json({ avatarUrl });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Database update failed" });
    }
  });
}
