const express = require("express");
const router = express.Router();
const Course = require("../models/course");


router.get("/courses/",async (req, res) => {
    try{
    const items = await Course.find()
    res.status(200).json(items)
    }
    catch{
        res.send ("can't upload items")
    }
});

router.post("/courses/",  async (req, res) => {
  try {
    const items = new Course(req.body);
    await items.save();
    res.status(200).json(items)
    console.log(req.body);
  } catch (error) {
    res.send("names upload failed ${error}");
  }
});

// delete route
router.post("/courses/:id",async(req,res)=>{
    try{                                                                                                                                                                                                                                
        await Course.deleteOne({_id:req.body.id});
        res.redirect("back")
    }
    catch(err){
        console.log(err)
    }
})

router.get("/courses/:id", async(req,res)=>{
    try{
        const item = await Course.findOne({_id:req.params.id});
        res.render("", {course:item});
    }
    catch(err){
        res.send("could not find courses");
        console.log(err)
    }
})

  
router.post("/courses/:id",async(req,res)=>{
    try{
        await Course.findOneAndUpdate({_id:req.query.id},req.body)
        res.redirect("")
    }
    catch(err){
        res.send("failed to update student details")
        console.log(err)
    }
})

module.exports = router;
