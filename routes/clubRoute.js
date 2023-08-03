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

//get all clubs
router.get("/", async(req,res) =>{
    try{
    const clubs = await clubModel.find();
    res.status(200).json(clubs);
    }catch (error) {
    res.status(500).send("failed to retrieve the clubs");
    }
})

//get a specific club
router.get("/:id", async (req, res) => {
    try{
    const club = await clubModel.findOne({_id:req.params.id});
    res.status(200).json(club);
    }catch (error) {
    res.status(500).send("failed to find the required club");
    }
});

//update a specifc club
router.put("/:id", async (req, res) => {
    try{
    const club = await clubModel.findOneAndUpdate({_id:req.params.id}, req.body, { new: true });
    res.status(200).json(club);
    }catch (error) {
    res.status(500).send("failed to update club details");
    }
});

//delete a specifc club

module.exports = router;
