const express = require("express");

const router = express.Router();
const routes = require("./healthCheck.js");

module.exports = routes(router);
