const express= require('express');
const app = express();
const port = process.env.PORT||3000;
const router=express.Router();
require('dotenv').config();
const mongoose = require("mongoose");


//middleware
app.use(express.json());//the body of the request is json
app.use(express.urlencoded({extended:true}));


//connecting to the db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true  
});

const db = mongoose.connection;
//checking if db has connected
db.once("open", () => {
console.log("connected to db");
})
db.on("error", (err) => {
console.error(err);
});









//this is the listener of the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));