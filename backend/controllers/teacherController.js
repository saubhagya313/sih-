// controllers/teacherController.js
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in .env");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const teacherRegister = async (req, res) => {
  try {
    const { username, password, fullName, schoolName, state, mobileNumber, subjects, classes, preferredLanguages, profilePicture } = req.body;
    
    const [existingTeacher, existingStudent] = await Promise.all([
      Teacher.findOne({ username }),
      Student.findOne({ username }),
    ]);
    if (existingTeacher || existingStudent) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (mobileNumber) {
      const [mobileTeacher, mobileStudent] = await Promise.all([
        Teacher.findOne({ mobileNumber }),
        Student.findOne({ mobileNumber }),
      ]);
      if (mobileTeacher || mobileStudent) {
        return res.status(400).json({ message: "Mobile number already exists" });
      }
    }

    const teacher = await Teacher.create({
      username,
      password,
      fullName,
      schoolName,
      state,
      mobileNumber,
      subjects,
      classes,
      preferredLanguages,
      profilePicture,
    });

    const token = generateToken(teacher._id);
    res.status(201).json({ token, user: teacher });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const teacherLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const teacher = await Teacher.findOne({ username });

    if (!teacher || teacher.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(teacher._id);
    res.json({ token, user: teacher });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ New: Function to get recommended teachers
export const getRecomendedTeachers = async (req, res) => {
  try {
    const { class: studentClass } = req.query;
    const teachers = await Teacher.find({ classes: studentClass });
    res.json(teachers.map(t => t._id));
  } catch (error) {
    console.error("Error getting recommended teachers:", error);
    res.status(500).json({ error: "Failed to get recommended teachers" });
  }
};