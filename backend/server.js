import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
dotenv.config();

// Import routes
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import videoRoutes from "./routes/video.js";

const app = express();

// ---------------- MIDDLEWARE ----------------

// Enable CORS for all origins, or specify a whitelist for production
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   credentials: true
// }));
// ... existing imports

// CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8081"], // Add your new frontend origin here
  credentials: true
}));

// ... rest of your code
// Parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: process.env.NODE_ENV === "production" }, // 1 day, secure in production
  })
);
app.use(flash());

// Make flash messages available in res.locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ---------------- STATIC UPLOADS ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- ROUTES ----------------
app.use("/api/auth/student", studentRoutes);
app.use("/api/auth/teacher", teacherRoutes);
app.use("/api/videos", videoRoutes);

// ---------------- ERROR HANDLING ----------------
// 404 Not Found handler
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// ---------------- MONGODB CONNECTION ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));