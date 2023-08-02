const mongoose = require("mongoose");

const clubModel = new mongoose.Schema({
    clubName:{
        type: String
    },
    headOfClub:{
        type: String
    }
})













module.exports = mongoose.model("club", clubModel)