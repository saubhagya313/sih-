import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  language: { type: String, required: true },
  classes: [{ type: String, required: true }],
  videoUrl: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }, // linked teacher
  views: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
