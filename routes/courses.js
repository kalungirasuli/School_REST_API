const express = require("express");
const router = express.Router();
const Course = require("../models/course");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing courses.
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Course:
 *      type: object
 *      required:
 *        - name
 *        - courseCode
 *        - department
 *        - duration
 *      properties:
 *          name:
 *            type: string
 *          courseCode:
 *            type: string
 *          department:
 *            type: string
 *          duration:
 *            type: string
 *      example:
 *         name: Buisness statistics
 *         courseCode: BBA
 *         department: Buisness
 *         duration: 3 years
 * 
 * 
 */

/**
 * @swagger
 * /v1/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course created successfully
 *       500:
 *         description: Failed to create course
 */

router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(200).send({ message: "Course created successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error creating course" });
  }
});

/**
 * @swagger
 * /v1/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Failed to fetch courses
 */

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send({ error: "Error fetching courses" });
  }
});

/**
 * @swagger
 * /v1/courses/{id}:
 *   get:
 *     summary: Get a specific course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: Course found successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Failed to fetch course
 */

router.get("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send({ error: "Error fetching course" });
  }
});

/**
 * @swagger
 * /v1/courses/{id}:
 *   put:
 *     summary: Update a specific course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Failed to update course
 */

router.put("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).send({ message: "Course not found" });
    }
    res.status(200).send({ message: "Course updated successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error updating course" });
  }
});

/**
 * @swagger
 * /v1/courses/{id}:
 *   delete:
 *     summary: Delete a specific course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Failed to delete course
 */

router.delete("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).send({ message: "Course not found" });
    }
    res.status(200).send({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Error deleting course" });
  }
});

module.exports = router;
