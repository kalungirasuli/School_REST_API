const dotenv = require("dotenv");
dotenv.config();

const connect = process.env.DATABASE



module.exports = connect;