import express from "express";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import fs from "fs";
import Video from "../models/Video.js";

const router = express.Router();

// ---------------- MULTER STORAGE ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/videos/";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|mov|avi/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) cb(null, true);
    else cb(new Error("Only video files (MP4, MOV, AVI) are allowed"));
  },
});

// ---------------- ROUTES ----------------

/**
 * POST /api/videos
 * Upload a new video (file or URL)
 */
router.post("/", upload.single("videoFile"), async (req, res) => {
  try {
    const { title, description, language, classes, teacherId, videoUrl } = req.body;

    if (!teacherId) return res.status(400).json({ error: "teacherId is required" });
    if (!title || !description || !language || !classes)
      return res.status(400).json({ error: "Missing required fields" });

    const parsedClasses = typeof classes === "string" ? JSON.parse(classes) : classes;

    const newVideo = new Video({
      title,
      description,
      language,
      classes: parsedClasses,
      teacher: mongoose.Types.ObjectId(teacherId),
      videoUrl: req.file ? `/uploads/videos/${req.file.filename}` : videoUrl,
      uploadedAt: new Date(),
      views: 0,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error("Video upload error:", err.message);
    res.status(500).json({ error: "Video upload failed", details: err.message });
  }
});

/**
 * GET /api/videos
 * Fetch all videos
 */
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("Fetch videos error:", err.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

/**
 * GET /api/videos/teacher/:teacherId
 * Fetch all videos uploaded by a specific teacher
 */
router.get("/teacher/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(teacherId))
      return res.status(400).json({ error: "Invalid teacherId" });

    const videos = await Video.find({ teacher: teacherId }).sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("Fetch teacher videos error:", err.message);
    res.status(500).json({ error: "Failed to fetch teacher videos" });
  }
});

/**
 * DELETE /api/videos/:id
 * Delete a video by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid video ID" });

    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Remove video file from disk if exists
    if (video.videoUrl && video.videoUrl.startsWith("/uploads/videos/")) {
      const filePath = path.join("uploads/videos", path.basename(video.videoUrl));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete video error:", err.message);
    res.status(500).json({ error: "Failed to delete video" });
  }
});

export default router;
