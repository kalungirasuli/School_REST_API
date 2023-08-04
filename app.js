const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const database = require("./database");
const mongoose = require("mongoose");
(swaggerJsdoc = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "https://schoolapi-op58.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve,  swaggerUi.setup(specs, { explorer: true }));

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
