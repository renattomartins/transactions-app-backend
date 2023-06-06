const express = require('express');
const { body } = require('express-validator');

const usersController = require('../controllers/users');
const passVerification = require('./helpers/password-verification');

const router = express.Router();

router.post(
  '/users',
  body('email').exists().notEmpty().isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').exists().isLength({ min: 8 }).withMessage('Minimum size of 8 characters'),
  body('passwordVerification').exists().custom(passVerification),
  usersController.createUser
);

module.exports = router;
