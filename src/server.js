// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

// Domain/models definitions
const User = require('./models/User');

// Routes definitions
const healthCheckRoutes = require('./infrastructure/rest/healthCheck.js');
const initialRoutes = require('./infrastructure/rest/initialRoute.js');
const usersRoutes = require('./infrastructure/rest/users.js');
const accountsRoutes = require('./infrastructure/rest/accounts.js');
const transactionsRoutes = require('./infrastructure/rest/transactions.js');

// Server initial config
const app = express();
const port = process.env.APP_PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes definition and Model injection
let router = express.Router();
router = healthCheckRoutes(router);
router = initialRoutes(router);
router = usersRoutes(router, User);
router = accountsRoutes(router);
router = transactionsRoutes(router);

// Router startup
app.use(express.json());
app.use(router);

// Server startup
if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Transactions API listening at http://localhost:${port}`);
}

module.exports = app;
