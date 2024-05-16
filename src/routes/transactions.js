const express = require('express');
const { param, body } = require('express-validator');

const isAuth = require('../middlewares/is-auth');
const transactionsController = require('../controllers/transactions');

const router = express.Router();

router.get(
  '/accounts/:accountId/transactions',
  isAuth,
  param('accountId').isNumeric().withMessage('Account ID must be numeric'),
  transactionsController.getTransactions
);

router.post(
  '/accounts/:accountId/transactions',
  param('accountId').isNumeric().withMessage('Account ID must be numeric'),
  body('description').notEmpty().isLength({ max: 255 }).withMessage('Max size of 255 characters'),
  body('amount').isNumeric().withMessage('Must be a number'),
  body('date').isISO8601().withMessage('Must be a valid date'),
  body('notes').isLength({ max: 1000 }).withMessage('Max size of 1000 characters'),
  body('isIncome').isBoolean(),
  isAuth,
  transactionsController.createTransaction
);

router.get(
  '/accounts/:accountId/transactions/:transactionId',
  isAuth,
  param('accountId').isNumeric().withMessage('Account ID must be numeric'),
  param('transactionId').isNumeric().withMessage('Transaction ID must be numeric'),
  transactionsController.getTransaction
);

router.put(
  '/accounts/:accountId/transactions/:transactionId',
  isAuth,
  param('accountId').isNumeric().withMessage('Account ID must be numeric'),
  param('transactionId').isNumeric().withMessage('Transaction ID must be numeric'),
  body('description').notEmpty().isLength({ max: 255 }).withMessage('Max size of 255 characters'),
  body('amount').isNumeric().withMessage('Must be a number'),
  body('date').isISO8601().withMessage('Must be a valid date'),
  body('notes').isLength({ max: 1000 }).withMessage('Max size of 1000 characters'),
  body('isIncome').isBoolean(),
  transactionsController.updateTransaction
);

router.delete(
  '/accounts/:accountId/transactions/:transactionId',
  isAuth,
  param('accountId').isNumeric().withMessage('Account ID must be numeric'),
  param('transactionId').isNumeric().withMessage('Transaction ID must be numeric'),
  transactionsController.deleteTransaction
);

module.exports = router;
