const express = require("express");
const router = express.Router();
const clubModel = require("../models/club");

router.post("/", async (req, res) => {
  try {
    const club = new clubModel(req.body);
    await club.save();
    res.status(200).send("Successfully added club");
  } catch (error) {
    res.status(500).send("Error occured");
  }
});

router.get("/:{id}", async (req, res) => {});

module.exports = router;
