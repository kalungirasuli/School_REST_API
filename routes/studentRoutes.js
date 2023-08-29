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

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - id
 *         - firstName
 *         - secondName
 *         - gender
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the student
 *         firstName:
 *           type: string
 *           description: The first name of the student
 *         secondName:
 *           type: string
 *           description: The second name of the student
 *         gender:
 *           type: string
 *           description: The gender of the student
 *       example:
 *         id: STD-123
 *         firstName: Dewney
 *         secondName: Alexander
 *         gender: male
 *        
 */


/**
 * @swagger
 * tags:
 *   name: Students
 *   description: The student API
 * /v1/students:
 *   get:
 *     summary: Lists all the students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The created student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Some server error
 * /v1/students/{id}:
 *   get:
 *     summary: Get the student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *     responses:
 *       200:
 *         description: The student response by id
 *         contenT:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: The student was not found
 *   put:
 *    summary: Update the student by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Student'
 *    responses:
 *      200:
 *        description: The student was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      404:
 *        description: The students was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The student id
 *
 *     responses:
 *       200:
 *         description: The student was deleted
 *       404:
 *         description: The student was not found
 */