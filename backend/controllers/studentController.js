import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const studentRegister = async (req, res) => {
    try {
        const { username, password, fullName, schoolName, state, class: className, preferredLanguage, profilePicture, mobileNumber } = req.body;
        console.log(username);
        console.log(password);

        if (!username || !password || !fullName || !mobileNumber) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const [existingStudent, existingTeacher] = await Promise.all([
            Student.findOne({ username }),
            Teacher.findOne({ username }),
        ]);
        if (existingStudent || existingTeacher) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const [mobileStudent, mobileTeacher] = await Promise.all([
            Student.findOne({ mobileNumber }),
            Teacher.findOne({ mobileNumber }),
        ]);
        if (mobileStudent || mobileTeacher) {
            return res.status(400).json({ message: "Mobile number already exists" });
        }

        const student = await Student.create({
            username,
            password, // Stored as plain text
            fullName,
            schoolName,
            state,
            class: className,
            preferredLanguage,
            profilePicture,
            mobileNumber,
        });

        const token = generateToken(student._id);
        res.status(201).json({ token, user: student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const studentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Backend received login request for student:", username);
        console.log("Backend received password:", password);
        const student = await Student.findOne({ username });

        if (!student || student.password !== password) {
            console.log("Login failed: Invalid credentials.");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(student._id);
        res.json({ token, user: student });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};