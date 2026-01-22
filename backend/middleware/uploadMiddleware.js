// middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

const videoUploadDir = path.join(process.cwd(), "uploads/videos");
const assignmentUploadDir = path.join(process.cwd(), "uploads/assignments");

// Ensure directories exist
if (!fs.existsSync(videoUploadDir)) fs.mkdirSync(videoUploadDir, { recursive: true });
if (!fs.existsSync(assignmentUploadDir)) fs.mkdirSync(assignmentUploadDir, { recursive: true });

// Use a single storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on file field name
    if (file.fieldname === "assignmentFile") {
      cb(null, assignmentUploadDir);
    } else {
      cb(null, videoUploadDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Correct: Export the upload variable here, after it's defined
export { upload };