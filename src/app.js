// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const healthRoutes = require('./routes/health.js');
const initialRoutes = require('./routes/initial.js');
const usersRoutes = require('./routes/users.js');
const accountsRoutes = require('./routes/accounts.js');
const transactionsRoutes = require('./routes/transactions.js');

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let router = express.Router();
router = accountsRoutes(router);
router = transactionsRoutes(router);

// Router startup
app.use(express.json()); //@todo verify
app.use(healthRoutes);
app.use(initialRoutes);
app.use(usersRoutes);
app.use(router);

// Server startup
if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Transactions API listening at http://localhost:${port}`);
}

module.exports = app;
