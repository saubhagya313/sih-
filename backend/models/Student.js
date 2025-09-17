import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain text
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  schoolName: { type: String },
  state: { type: String },
  class: { type: String },
  preferredLanguage: { type: String },
  profilePicture: { type: String },
}, { timestamps: true });

// Plain text password check
studentSchema.methods.matchPassword = function(enteredPassword) {
  return this.password === enteredPassword;
};

const Student = mongoose.model("Student", studentSchema);
export default Student;