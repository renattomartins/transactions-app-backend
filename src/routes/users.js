const express = require('express');
const { body } = require('express-validator');

const usersController = require('../controllers/users');

const router = express.Router();

router.post(
  '/users',
  body('email').exists().notEmpty(),
  body('password').exists().notEmpty(),
  body('passwordVerification').exists().notEmpty(),
  usersController.createUser
);

module.exports = router;
