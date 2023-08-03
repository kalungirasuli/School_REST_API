const express = require("express");
const router = express.Router();
const staffModel = require("../models/staff");

//create staff
router.post("/", async (req, res) => {
  try {
    const staff = new staffModel(req.body);
    await staff.save();
    res.status(200).send("Successfully added staff");
  } catch (error) {
    res.status(500).send("Error occured");
  }
});

//get all staff
router.get("/", async (req, res) => {
  try {
    const staff = await staffModel.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send("failed to retrieve the staff");
  }
});

//get a specific staff
router.get("/:id", async (req, res) => {
  try {
    const staff = await staffModel.findOne({ _id: req.params.id });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send("failed to find the required staff");
  }
});

//update a specifc staff
router.put("/:id", async (req, res) => {
  try {
    const staff = await staffModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send("failed to update staff details");
  }
});

//delete a specifc staff
router.delete("/:id", async (req, res) => {
  try {
    await staffModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("successfully deleted staff record");
  } catch (error) {
    res.status(500).send("failed to update staff details");
  }
});

module.exports = router;
