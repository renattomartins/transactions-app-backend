const express = require('express');

const router = express.Router();

const healthCheckRoutes = require('./healthCheck/healthCheck.js');
const initialRoutes = require('./initialRoute/initialRoute.js');
const accountsRoutes = require('./accounts/accounts.js');
const transactionsRoutes = require('./transactions/transactions.js');

healthCheckRoutes(router);
initialRoutes(router);
accountsRoutes(router);
transactionsRoutes(router);

module.exports = router;
