// controllers/videoController.js
import Video from "../models/Video.js";

// ---------------- UPLOAD VIDEO ----------------
export const uploadVideo = async (req, res) => {
  try {
    console.log("📥 Incoming upload request");
    console.log("➡️ Body received:", req.body);
    console.log("➡️ File received:", req.file);
    const { title, description, language, teacherId } = req.body;
    const classes = req.body.classes
      ? String(req.body.classes)
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
      : [];

    console.log("➡️ Parsed classes:", classes);

    if (!title || !description || !language || !teacherId || classes.length === 0 || !req.file) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("✅ All fields received. Saving video...");

    const newVideo = new Video({
      title,
      description,
      language,
      classes,
      teacherId,
      videoUrl: `/uploads/videos/${req.file.filename}`,
    });

    await newVideo.save();

    console.log("✅ Video saved successfully:", newVideo._id);
    res.status(201).json(newVideo);
  } catch (err) {
    console.error("🔥 Upload error:", err);
    res.status(500).json({ error: "Server error while uploading video" });
  }
};

// ---------------- GET VIDEOS BY TEACHER ----------------
export const getVideosByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    console.log(`📥 Fetching videos for teacherId: ${teacherId}`);
    const videos = await Video.find({ teacherId }).sort({ uploadedAt: -1 });
    console.log(`✅ Found ${videos.length} videos`);
    res.json(videos);
  } catch (err) {
    console.error("🔥 Fetch videos error:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// ---------------- DELETE VIDEO ----------------
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📥 Deleting video with ID: ${id}`);
    await Video.findByIdAndDelete(id);
    console.log("✅ Video deleted successfully");
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("🔥 Delete video error:", err);
    res.status(500).json({ error: "Failed to delete video" });
  }
};

// ✅ New: Function to get recommended videos
export const getRecomendedVideos = async (req, res) => {
    try {
        const teacherIds = req.query.teacherIds.split(',');
        const videos = await Video.find({ teacherId: { $in: teacherIds } }).sort({ uploadedAt: -1 });
        res.json(videos);
    } catch (error) {
        console.error("Error getting recommended videos:", error);
        res.status(500).json({ error: "Failed to get recommended videos" });
    }
};