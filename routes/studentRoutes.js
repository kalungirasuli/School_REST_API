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

// Get a specific student by Id
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ error: "Error fetching student" });
  }
});

// Update a specific student by Id
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: req.params.id },
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

// Delete a specific student by Id
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({
      id: req.params.id,
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
