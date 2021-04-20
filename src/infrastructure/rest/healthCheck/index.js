const express = require("express");

const router = express.Router();
const routes = require("./healthCheck");

module.exports = routes(router);
