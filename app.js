const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const database = require("./database");
const mongoose = require("mongoose");

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

//import main route
const mainRoute = require("./routes/mainRoute");

//use route
app.use("/v1", mainRoute);

//this is the listener of the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
