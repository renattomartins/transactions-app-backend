const express = require('express');

const transactionsController = require('../controllers/transactions');

const router = express.Router();

router.get('/accounts/3544/transactions', transactionsController.getTransactions);
router.post('/accounts/3544/transactions', transactionsController.createTransaction);
router.get('/accounts/3544/transactions/12944', transactionsController.getTransaction);
router.put('/accounts/3544/transactions/12944', transactionsController.updateTransaction);
router.patch(
  '/accounts/3544/transactions/12944',
  transactionsController.partiallyUpdateTransaction
);
router.delete('/accounts/3544/transactions/12944', transactionsController.deleteTransaction);

module.exports = router;
