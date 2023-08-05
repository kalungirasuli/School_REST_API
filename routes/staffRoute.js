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


/**
 * @swagger
 * tags:
 *    name: Staff
 *    description: API for managing staff
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       required:
 *         - Id
 *         - firstName
 *         - secondName
 *         - gender
 *         - age
 *         - email
 *       properties:
 *         Id:
 *           type: string
 *         firstName:
 *           type: string
 *         secondName:
 *           type: string
 *         gender:
 *           type: string
 *         age:
 *           type: number
 *         email:
 *           type: string
 *       example:
 *         Id: SCH-001
 *         firstName: Mike 
 *         secondName: Kajuna 
 *         gender: male
 *         age: 22
 *         email: mikek@gmail.com
 * 
 */


/**
 * @swagger
 * /v1/staff:
 *    post:
 *      summary: creates a staff member
 *      tags: [Staff]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Staff'
 *      responses:
 *          200:
 *            description: Succesfully created staff member 
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/Staff'   
 *          500:
 *            description: Failed to create a staff member
 * /v1/staff/:
 *    get:
 *      summary: Lists all staff
 *      tags: [Staff]
 *      responses:
 *        200:
 *          description: Get all staff
 *          content:
 *              application/json:
 *                  schema:  
*                      $ref: '#/components/schemas/Staff'
 *                  
 *         
 *          
 */