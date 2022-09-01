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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(healthRoutes);
app.use(initialRoutes);
app.use(usersRoutes);
app.use(accountsRoutes);
app.use(transactionsRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Transactions API listening at http://localhost:${port}`);
}

module.exports = app;
