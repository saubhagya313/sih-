// import express from "express";
// import jwt from "jsonwebtoken";
// import Teacher from "../models/Teacher.js";
// import Student from "../models/Student.js";
// import { 
//     teacherLogin, 
//     teacherRegister, 
//     getRecomendedTeachers // ✅ New import
// } from "../controllers/teacherController.js"; 


// const router = express.Router();

// const generateToken = (id) => {
//   if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not defined in .env");
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // ---------------- TEACHER REGISTER ----------------
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password, fullName, schoolName, state, mobileNumber, subjects, classes, preferredLanguages, profilePicture } = req.body;
//     console.log(mobileNumber);
//     const [existingTeacher, existingStudent] = await Promise.all([
//       Teacher.findOne({ username }),
//       Student.findOne({ username }),
//     ]);
//     if (existingTeacher || existingStudent) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     if (mobileNumber) {
//       const [mobileTeacher, mobileStudent] = await Promise.all([
//         Teacher.findOne({ mobileNumber }),
//         Student.findOne({ mobileNumber }),
//       ]);
//       if (mobileTeacher || mobileStudent) {
//         return res.status(400).json({ message: "Mobile number already exists" });
//       }
//     }

//     const teacher = await Teacher.create({
//       username,
//       password, // Stored as plain text
//       fullName,
//       schoolName,
//       state,
//       mobileNumber,
//       subjects,
//       classes,
//       preferredLanguages,
//       profilePicture,
//     });

//     const token = generateToken(teacher._id);
//     res.status(201).json({ token, user: teacher });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ---------------- TEACHER LOGIN ----------------
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const teacher = await Teacher.findOne({ username });

//     // Plain text password check
//     if (!teacher || teacher.password !== password) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = generateToken(teacher._id);
//     res.json({ token, user: teacher });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;




// routes/teacher.js
import express from "express";
import { 
    teacherLogin, 
    teacherRegister, 
    getRecomendedTeachers 
} from "../controllers/teacherController.js"; 

const router = express.Router();

// ---------------- TEACHER REGISTER ----------------
router.post("/register", teacherRegister);

// ---------------- TEACHER LOGIN ----------------
router.post("/login", teacherLogin);

// ---------------- GET RECOMMENDED TEACHERS ----------------
router.get("/recommended", getRecomendedTeachers);

export default router;