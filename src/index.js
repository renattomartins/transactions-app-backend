const express = require('express');
const restRoutes = require('./infrastructure/rest');

const app = express();

app.use(express.json());
app.use(restRoutes);

module.exports = app;
