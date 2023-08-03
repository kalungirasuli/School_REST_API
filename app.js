const express = require("express");
const app = express();
<<<<<<< HEAD
const router=express.Router();
const mongoose= require('mongoose')

=======
const port = process.env.PORT || 3000;
const database = require("./database");
const mongoose = require("mongoose");
>>>>>>> f906acd55a246354ecc53fdcf68d5e99e57eb26a

//middleware
app.use(express.json()); //the body of the request is json
app.use(express.urlencoded({ extended: true }));

//connecting to the db
mongoose.connect(database.connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
//checking if db has connected
db.once("open", () => {
  console.log("connected to db");
});
db.on("error", (err) => {
  console.error(err);
});

<<<<<<< HEAD
// define a route handler for the default home page
const tryRoute=require('./routes/try.js');
const deptRoutes = require('./routes/deptRoutes.js')

mongoose.connect('mongodb+srv://jumajosephat61:techfier@techfierdb.d6qutsb.mongodb.net/school_db', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>{
    console.log('Connected to Database')
})
.catch((err)=>{
    console.error('Error connecting to db')
});



//this is the routes for trial
app.use('/',tryRoute)
app.use('/',deptRoutes)

//this is the listener of the server
app.listen(3000, () => console.log(`app listening on port 3000`));
=======
//import main route
const mainRoute = require("./routes/mainRoute");

//use route
app.use("/v1", mainRoute);

//this is the listener of the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
>>>>>>> f906acd55a246354ecc53fdcf68d5e99e57eb26a
