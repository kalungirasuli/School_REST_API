const express = require("express");
const router = express.Router();
const clubRoute = require("./clubRoute");
const studentRoute = require("../routes/studentRoutes")

router.use("/clubs", clubRoute);
router.use("/students", studentRoute);

module.exports = router;
