const mongoose = require('mongoose')
    const courseSchema = new mongoose.Schema({

       name:{
        type:String,
        default:null  
      },
      courseCode:{
        type:String,
        default:null  
      },
      department:{
        type:String,
        default:null 
      },
      duration:{
        type:String,
        default:null 
      },
      
      
    })
  
 
   
    module.exports = new mongoose.model("Course",courseSchema);