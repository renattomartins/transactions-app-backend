const express = require('express');
const routes = require('./infrastructure/rest');

const app = express();

app.use(express.json());
app.use(routes);

module.exports = app;
