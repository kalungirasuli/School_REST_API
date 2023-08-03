const express = require("express");
const router = express.Router();
const Course = require("../models/course");





router.post("/", async (req, res) => {
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(200).send({ message: "Course created successfully" });
    } catch (err) {
      res.status(500).send({ error: "Error creating course" });
    }
  });
  
  // Get all courses
  router.get("/", async (req, res) => {
    try {
      const course = await Course.find();
      res.status(200).send(course);
    } catch (err) {
      res.status(500).send({ error: "Error fetching course" });
    }
  });
  
  // Get a specific course by ID
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
  
  // Update a specific course by ID
  router.put("/:id", async (req, res) => {
    try {
      const courseId = req.params.id;
  
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        req.body,
        { new: true } 
      );
      if (!updatedCourse) {
        return res.status(404).send({ message: "Course not found" });
      }
      res.status(200).send({ message: "Course updated successfully" });
    } catch (err) {
      res.status(500).send({ error: "Error updating course" });
    }
  });
  
  // Delete a specific Course by ID
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
