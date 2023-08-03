const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: {
        type:String,
        trim: true
    },
    staff: {
        type:String,
        trim: true
    },
    headOfDepartment: {
        type : String,
        trim: true
    },
    coursesInDepartment:{
        type:String,
        trim: true
    },
})

const Department = mongoose.model('Department', departmentSchema);
module.exports=  Department;