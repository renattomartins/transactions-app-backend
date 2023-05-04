// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

// const sequelize = require('./util/database');
const User = require('./models/user');
const Account = require('./models/account');
const Transaction = require('./models/transaction');

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

User.hasMany(Account, { onDelete: 'cascade' });
Account.belongsTo(User);
Account.hasMany(Transaction, { onDelete: 'cascade' });
Transaction.belongsTo(Account);

if (process.env.NODE_ENV !== 'test') {
  // sequelize.sync({ force: true }).then(() => {
  app.listen(port);
  // });
  // eslint-disable-next-line no-console
  console.log(`Transactions API listening at http://localhost:${port}`);
}

module.exports = app;
