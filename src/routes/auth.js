const express = require('express');
// eslint-disable-next-line no-unused-vars
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.login);

module.exports = router;
