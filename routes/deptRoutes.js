const express = require("express");
const router = express.Router();
const Department = require("../models/department");

// POST API
router.post('/', async (req, res) => {
    try {
      const { staff, departmentName, headOfDepartment, coursesInDepartment } = req.body;
      const existingDepartment = await Department.findOne({ departmentName });
      if (existingDepartment) {
        return res.status(409).json({ error: 'there are no departments available' });
      }
      const newDepartment = new Department({
        staff,
        departmentName,
        headOfDepartment,
        coursesInDepartment
      });
      const savedDepartment = await newDepartment.save();
      res.status(201).json(savedDepartment);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create the department.' });
router.post("/", async (req, res) => {
  try {
    const { staff, departmentName, headOfDepartment, coursesInDepartment } =
      req.body;
    const existingDepartment = await Department.findOne({ departmentName });
    if (existingDepartment) {
      return res
        .status(409)
        .json({ error: "Department with this staffName already exists." });
    }
    const newDepartment = new Department({
      staff,
      departmentName,
      headOfDepartment,
      coursesInDepartment,
    });
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create the department." });
  }
});

// GET API FOR ALL DEPARTMENTS
  router.get('/', async (req, res) => {
    try {
      const departments = await Department.find({});
      res.status(200).json(departments);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch departments.' });
    }
  });




// GET API FOR A SPECIFIC DEPARTMENT
  router.get('/:id', async (req, res) => {
    try {
      const departmentName = req.params.departmentName;
      const department = await Department.findOne({ departmentName });
  
      if (!department) {
        return res.status(404).json({ error: 'Department not found.' });
      }
  
      res.status(200).json(department);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch the department.' });
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch departments." });
  }
});

// GET API FOR A SPECIFIC DEPARTMENT
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findOne({ _id: req.params.id });
    if (!department) {
      return res.status(404).json({ error: "Department not found." });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch the department." });
  }
});

// PUT API FOR A SPECIFIC DEPARTMENT
  router.put('/:id', async (req, res) => {
    try {
      const departmentName = req.params.departmentName;
      const updates = req.body;
  
      const updatedDepartment = await Department.findOneAndUpdate(
        { departmentName },
        updates,
        { new: true }
      );
  
      if (!updatedDepartment) {
        return res.status(404).json({ error: 'Department not found.' });
      }
  
      res.status(200).json(updatedDepartment);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the department.' });
router.put("/:id", async (req, res) => {
  try {
    const updatedDepartment = await Department.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found." });
    }

    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update the department." });
  }
});

// DELETE API FOR A SPECIFIC DEPARTMENT
  router.delete('/:id', async (req, res) => {
    try {
      const departmentName = req.params.departmentName;
  
      const deletedDepartment = await Department.findOneAndDelete({ departmentName });
  
      if (!deletedDepartment) {
        return res.status(404).json({ error: 'Department not found.' });
      }
  
      res.status(200).json({ message: 'Department deleted successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the department.' });
router.delete("/:id", async (req, res) => {
  try {
    const deletedDepartment = await Department.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedDepartment) {
      return res.status(404).json({ error: "Department not found." });
    }

    res.status(200).json({ message: "Department deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the department." });
  }
});

module.exports = router;
