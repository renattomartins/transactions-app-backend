const express = require("express");

const router = express.Router();
const routes = require("./initialRoute");

module.exports = routes(router);
