const express = require('express');

const Account = require('./core/accounts/Account.js');

const healthCheckRoutes = require('./infrastructure/rest/healthCheck.js');
const initialRoutes = require('./infrastructure/rest/initialRoute.js');
const accountsRoutes = require('./infrastructure/rest/accounts.js');
const transactionsRoutes = require('./infrastructure/rest/transactions.js');

Account();

const app = express();
let router = express.Router();

router = healthCheckRoutes(router);
router = initialRoutes(router);
router = accountsRoutes(router);
router = transactionsRoutes(router);

app.use(express.json());
app.use(router);

module.exports = app;
