const express = require("express");
const router = express.Router();
const clubRoute = require("./clubRoute");

router.use("/clubs", clubRoute);

module.exports = router;
