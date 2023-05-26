const express = require('express');
const { body } = require('express-validator');

const usersController = require('../controllers/users');
const passVerification = require('./helpers/password-verification');

const router = express.Router();

router.post(
  '/users',
  body('email').exists().notEmpty(),
  body('password').exists().notEmpty(),
  body('passwordVerification').exists().notEmpty().custom(passVerification),
  usersController.createUser
);

module.exports = router;
