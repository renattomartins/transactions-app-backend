const express = require('express');

const router = express.Router();
const routes = require('./accounts.js');

module.exports = routes(router);
