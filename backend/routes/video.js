// routes/video.js
import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";

import { 
    uploadVideo, 
    getVideosByTeacher, 
    deleteVideo, 
    getRecomendedVideos // 👈 Added
} from "../controllers/videoController.js";

const router = express.Router();

router.post("/upload", upload.single("videoFile"), uploadVideo);
router.get("/teacher/:teacherId", getVideosByTeacher);
router.delete("/:id", deleteVideo);

// ---------------- GET RECOMMENDED VIDEOS ----------------
router.get("/recommended", getRecomendedVideos);

export default router;