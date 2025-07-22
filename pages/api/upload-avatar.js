import formidable from "formidable";
import fs from "fs";
export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Upload error" });

    const file = files.avatar;
    const filename = file.newFilename;

    // Save to user profile in DB here if needed
    return res.status(200).json({ url: `/uploads/${filename}` });
  });
}
