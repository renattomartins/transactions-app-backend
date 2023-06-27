const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
  '/login',
  body('email').exists().notEmpty().isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').exists().notEmpty(),
  authController.login
);

module.exports = router;
