const express = require('express');

const router = express.Router();
const routes = require('./initialRoute.js');

module.exports = routes(router);
