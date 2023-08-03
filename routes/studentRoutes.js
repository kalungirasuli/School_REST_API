const express = require("express");
const router = express.Router();
const Student = require("../models/student"); 

// Create a student
router.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(200).send({ message: "Student created successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error creating student" });
  }
});

// Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({ error: "Error fetching students" });
  }
});

// Get a specific student by ID
router.get("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ error: "Error fetching student" });
  }
});

// Update a specific student by ID
router.put("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
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

// Delete a specific student by ID
router.delete("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error deleting student" });
  }
});

module.exports = router;
