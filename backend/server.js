import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import teacherRoutes from "./routes/teacher.js";
import studentRoutes from "./routes/student.js";
import videoRoutes from "./routes/video.js"; // 👈 added
import assignmentRoutes from "./routes/assignment.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded video files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.use("/api/assignments", assignmentRoutes);

// Routes
app.use("/api/auth/teacher", teacherRoutes);
app.use("/api/auth/student", studentRoutes);
app.use("/api/videos", videoRoutes); // 👈 added

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
