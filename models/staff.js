const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("staff", staffSchema);
