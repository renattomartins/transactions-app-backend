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
  body('description')
    .isLength({ min: 1, max: 255 })
    .withMessage('Field must have length between 1-255 characteres'),
  body('amount').isNumeric().withMessage('Value must be a number'),
  body('date').isISO8601().withMessage('Value must be a valid date (ISO8601)'),
  body('notes').isLength({ max: 1000 }).withMessage('Length limit of 1000 characteres'),
  body('isIncome').isBoolean(),
  isAuth,
  transactionsController.createTransaction
);

router.get('/accounts/3544/transactions/12944', isAuth, transactionsController.getTransaction);
router.put('/accounts/3544/transactions/12944', isAuth, transactionsController.updateTransaction);
router.patch(
  '/accounts/3544/transactions/12944',
  isAuth,
  transactionsController.partiallyUpdateTransaction
);
router.delete(
  '/accounts/3544/transactions/12944',
  isAuth,
  transactionsController.deleteTransaction
);

module.exports = router;
