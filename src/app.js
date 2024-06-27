// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const User = require('./models/user');
const Account = require('./models/account');
const Transaction = require('./models/transaction');

const healthRoutes = require('./routes/health.js');
const initialRoutes = require('./routes/initial.js');
const usersRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');
const accountsRoutes = require('./routes/accounts.js');
const transactionsRoutes = require('./routes/transactions.js');

const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors);

app.use(healthRoutes);
app.use(initialRoutes);
app.use(usersRoutes);
app.use(authRoutes);
app.use(accountsRoutes);
app.use(transactionsRoutes);

app.use(errorHandler);

User.hasMany(Account, { onDelete: 'cascade' });
Account.belongsTo(User);
Account.hasMany(Transaction, { onDelete: 'cascade' });
Transaction.belongsTo(Account);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port);

  // eslint-disable-next-line no-console
  console.log(`Transactions API is running on port ${port}`);
}

module.exports = app;
