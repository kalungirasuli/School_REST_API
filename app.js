const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const database = require("./database");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(database.connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //connecting to the db

const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to db");
}); //checking if db has connected
db.on("error", (err) => {
  console.error(err);
});

const setupSwagger = require("./swagger");
setupSwagger(app);
const mainRoute = require("./routes/mainRoute"); //import main route
app.use("/v1", mainRoute); //use route

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
