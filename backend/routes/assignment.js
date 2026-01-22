
//routes->assignment.js
import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  uploadAssignment,
  getAssignmentsByTeacher,
  deleteAssignment,
  getRecomendedAssignments // 👈 Added
} from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/upload", upload.single("assignmentFile"), uploadAssignment);
router.get("/teacher/:teacherId", getAssignmentsByTeacher);
router.delete("/:id", deleteAssignment);

// ---------------- GET RECOMMENDED ASSIGNMENTS ----------------
router.get("/recommended", getRecomendedAssignments);

export default router;