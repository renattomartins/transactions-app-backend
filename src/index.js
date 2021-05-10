const express = require('express');

const app = express();
const router = express.Router();

const healthCheckRoutes = require('./infrastructure/rest/healthCheck.js');
const initialRoutes = require('./infrastructure/rest/initialRoute.js');
const accountsRoutes = require('./infrastructure/rest/accounts.js');
const transactionsRoutes = require('./infrastructure/rest/transactions.js');

healthCheckRoutes(router);
initialRoutes(router);
accountsRoutes(router);
transactionsRoutes(router);

app.use(express.json());
app.use(router);

module.exports = app;
