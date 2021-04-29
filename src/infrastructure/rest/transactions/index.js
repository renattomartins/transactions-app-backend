const express = require('express');

const router = express.Router();
const routes = require('./transactions.js');

module.exports = routes(router);
