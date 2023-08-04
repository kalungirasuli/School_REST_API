const express = require("express");
const router = express.Router();
const clubModel = require("../models/club");

/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: API for managing clubs.
 */

/**
 * @swagger
 * /v1/clubs:
 *   post:
 *     summary: Create a new club
 *     tags: [Clubs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Club'
 *     responses:
 *       200:
 *         description: Club created successfully
 *       500:
 *         description: Failed to create club
 */

router.post("/", async (req, res) => {
  try {
    const club = new clubModel(req.body);
    await club.save();
    res.status(200).send("Successfully added club");
  } catch (error) {
    res.status(500).send("Error occurred");
  }
});

/**
 * @swagger
 * /v1/clubs:
 *   get:
 *     summary: Get all clubs
 *     tags: [Clubs]
 *     responses:
 *       200:
 *         description: List of clubs
 *       500:
 *         description: Failed to retrieve clubs
 */

router.get("/", async (req, res) => {
  try {
    const clubs = await clubModel.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).send("Failed to retrieve the clubs");
  }
});

/**
 * @swagger
 * /v1/clubs/{id}:
 *   get:
 *     summary: Get a specific club by ID
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the club
 *     responses:
 *       200:
 *         description: Club found successfully
 *       500:
 *         description: Failed to find the required club
 */

router.get("/:id", async (req, res) => {
  try {
    const club = await clubModel.findOne({ _id: req.params.id });
    res.status(200).json(club);
  } catch (error) {
    res.status(500).send("Failed to find the required club");
  }
});

/**
 * @swagger
 * /v1/clubs/{id}:
 *   put:
 *     summary: Update a specific club by ID
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the club
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Club'
 *     responses:
 *       200:
 *         description: Club updated successfully
 *       500:
 *         description: Failed to update club details
 */

router.put("/:id", async (req, res) => {
  try {
    const club = await clubModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(club);
  } catch (error) {
    res.status(500).send("Failed to update club details");
  }
});

/**
 * @swagger
 * /v1/clubs/{id}:
 *   delete:
 *     summary: Delete a specific club by ID
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the club
 *     responses:
 *       200:
 *         description: Club deleted successfully
 *       500:
 *         description: Failed to delete club
 */

router.delete("/:id", async (req, res) => {
  try {
    await clubModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("Successfully deleted club record");
  } catch (error) {
    res.status(500).send("Failed to delete club");
  }
});

module.exports = router;
