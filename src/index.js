const express = require("express");
const healthCheckRoutes = require("./infrastructure/rest/healthCheck/index.js");
const initialRoutes = require("./infrastructure/rest/initialRoute/index.js");
const accountsRoutes = require("./infrastructure/rest/accounts/index.js");
const transactionsRoutes = require("./infrastructure/rest/transactions/index.js");

const app = express();

app.use(express.json());
app.use(healthCheckRoutes);
app.use(initialRoutes);
app.use(accountsRoutes);
app.use(transactionsRoutes);

module.exports = app;
