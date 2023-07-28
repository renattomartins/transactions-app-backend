const express = require('express');

const isAuth = require('../middlewares/is-auth');
const transactionsController = require('../controllers/transactions');

const router = express.Router();

router.get('/accounts/:accountId/transactions', isAuth, transactionsController.getTransactions);

router.post('/accounts/3544/transactions', isAuth, transactionsController.createTransaction);
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
