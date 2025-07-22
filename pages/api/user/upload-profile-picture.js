import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Upload error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
});

apiRoute.use(upload.single('profilePicture'));

apiRoute.post((req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  // Save this to the user's record in DB (simulate here)
  res.status(200).json({ user: { profilePicture: imageUrl } });
});

export const config = {
  api: {
    bodyParser: false, // Required for multer
  },
};

export default apiRoute;
