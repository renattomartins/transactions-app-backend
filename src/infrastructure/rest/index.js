const express = require('express');

const router = express.Router();

const healthCheckRoutes = require('./healthCheck.js');
const initialRoutes = require('./initialRoute.js');
const accountsRoutes = require('./accounts.js');
const transactionsRoutes = require('./transactions.js');

healthCheckRoutes(router);
initialRoutes(router);
accountsRoutes(router);
transactionsRoutes(router);

module.exports = router;
