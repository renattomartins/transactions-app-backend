// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const AccountProvider = require('./infrastructure/providers/AccountProvider.js');
const Account = require('./core/accounts/Account.js');
const healthCheckRoutes = require('./infrastructure/rest/healthCheck.js');
const initialRoutes = require('./infrastructure/rest/initialRoute.js');
const accountsRoutes = require('./infrastructure/rest/accounts.js');
const transactionsRoutes = require('./infrastructure/rest/transactions.js');

const app = express();
const port = process.env.APP_PORT || 3000;

Account(AccountProvider);

let router = express.Router();
router = healthCheckRoutes(router);
router = initialRoutes(router);
router = accountsRoutes(router);
router = transactionsRoutes(router);

app.use(express.json());
app.use(router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Transactions API listening at http://localhost:${port}`);
}

module.exports = app;
