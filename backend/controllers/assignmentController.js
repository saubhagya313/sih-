// controllers/assignmentController.js
import Assignment from "../models/Assignment.js";

export const uploadAssignment = async (req, res) => {
  try {
    const { name, classes, teacherId } = req.body;
    if (!req.file || !name || !classes || !teacherId) {
      return res.status(400).json({ error: "Missing required fields or file" });
    }

    const parsedClasses = String(classes).split(",").map(c => c.trim()).filter(Boolean);

    const newAssignment = new Assignment({
      name,
      classes: parsedClasses,
      teacherId,
      fileUrl: `/uploads/assignments/${req.file.filename}`,
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAssignmentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const assignments = await Assignment.find({ teacherId }).sort({ uploadedAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("🔥 Delete assignment error:", err);
    res.status(500).json({ error: "Failed to delete assignment" });
  }
};

// ✅ New: Function to get recommended assignments
export const getRecomendedAssignments = async (req, res) => {
    try {
        const teacherIds = req.query.teacherIds.split(',');
        const assignments = await Assignment.find({ teacherId: { $in: teacherIds } }).sort({ uploadedAt: -1 });
        res.json(assignments);
    } catch (error) {
        console.error("Error getting recommended assignments:", error);
        res.status(500).json({ error: "Failed to get recommended assignments" });
    }
};