const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  Id: {
    type: String,
    trim: true,
  },

  firstName: {
    type: String,
    trim: true,
  },

  secondName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("student", studentSchema);
