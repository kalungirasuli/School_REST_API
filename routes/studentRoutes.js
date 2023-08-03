const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// Create a student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).send({ message: "Student created successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error creating student" });
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({ error: "Error fetching students" });
  }
});

// Get a specific student by studentId
router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ error: "Error fetching student" });
  }
});

// Update a specific student by studentId
router.put("/:studentId", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId: req.params.studentId },
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send({ message: "Student updated successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error updating student" });
  }
});

// Delete a specific student by studentId
router.delete("/:studentId", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({
      studentId: req.params.studentId,
    });
    if (!deletedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error deleting student" });
  }
});

module.exports = router;
