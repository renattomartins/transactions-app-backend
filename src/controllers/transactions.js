const { validationResult } = require('express-validator');
const Account = require('../models/account');

const buildLocation = (req, accountIdId, resourceId) =>
  `${req.protocol}://${req.get('host')}/accounts/${accountIdId}/transactions/${resourceId}`;

exports.getTransactions = async (req, res, next) => {
  const { accountId } = req.params;
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      const error = new Error('Bad request');
      error.statusCode = 400;
      error.details = validationErrors.array();
      throw error;
    }

    const account = await Account.findByPk(accountId);

    if (!account) {
      const error = new Error('Account not found');
      error.statusCode = 404;
      throw error;
    }

    if (account.UserId !== req.userId) {
      const error = new Error('Forbidden');
      error.statusCode = 403;
      throw error;
    }

    const transactions = await account.getTransactions({ order: [['date', 'DESC']] });

    res.set('X-Total-Count', transactions.length);
    res.json(transactions);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.createTransaction = async (req, res, next) => {
  const { accountId } = req.params;
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array();
      let error;

      switch (errors[0].location) {
        case 'body':
          error = new Error('Unprocessable Entity');
          error.statusCode = 422;
          error.details = errors;
          break;
        case 'params':
          error = new Error('Bad request');
          error.statusCode = 400;
          error.details = [errors[0]];
          break;
        default:
          error = new Error('Bad request');
          error.statusCode = 400;
          error.details = errors;
      }
      throw error;
    }

    const account = await Account.findByPk(accountId);

    if (!account) {
      const error = new Error('Account not found');
      error.statusCode = 404;
      throw error;
    }

    if (account.UserId !== req.userId) {
      const error = new Error('Forbidden');
      error.statusCode = 403;
      throw error;
    }

    const transaction = await account.createTransaction(req.body);

    res.set('Location', buildLocation(req, accountId, transaction.id));
    res.status(201).json(transaction);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.getTransaction = async (req, res, next) => {
  const { accountId, transactionId } = req.params;
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      const error = new Error('Bad request');
      error.statusCode = 400;
      error.details = validationErrors.array();
      throw error;
    }

    const account = await Account.findByPk(accountId);
    if (!account) {
      const error = new Error('Account not found');
      error.statusCode = 404;
      throw error;
    }

    if (account.UserId !== req.userId) {
      const error = new Error('Forbidden');
      error.statusCode = 403;
      throw error;
    }

    const transaction = await account.getTransactions({ where: { id: transactionId } });
    if (transaction.length === 0) {
      const error = new Error('Transaction not found');
      error.statusCode = 404;
      throw error;
    }

    res.json(transaction[0]);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.updateTransaction = async (req, res, next) => {
  const { accountId, transactionId } = req.params;
  const { description, amount, date, notes, isIncome } = req.body;
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array();
      let error;

      switch (errors[0].location) {
        case 'body':
          error = new Error('Unprocessable Entity');
          error.statusCode = 422;
          error.details = errors;
          break;
        case 'params':
          error = new Error('Bad request');
          error.statusCode = 400;
          error.details = [errors[0]];
          break;
        default:
          error = new Error('Bad request');
          error.statusCode = 400;
          error.details = errors;
      }
      throw error;
    }

    const account = await Account.findByPk(accountId);
    if (!account) {
      const error = new Error('Account not found');
      error.statusCode = 404;
      throw error;
    }

    if (account.UserId !== req.userId) {
      const error = new Error('Forbidden');
      error.statusCode = 403;
      throw error;
    }

    const transactions = await account.getTransactions({ where: { id: transactionId } });
    const transaction = transactions[0];

    if (!transaction) {
      const error = new Error('Transaction not found');
      error.statusCode = 404;
      throw error;
    }

    transaction.description = description;
    transaction.amount = amount;
    transaction.date = date;
    transaction.notes = notes;
    transaction.isIncome = isIncome;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  const { accountId, transactionId } = req.params;
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      const error = new Error('Bad request');
      error.statusCode = 400;
      error.details = validationErrors.array();
      throw error;
    }

    const account = await Account.findByPk(accountId);
    if (!account) {
      const error = new Error('Account not found');
      error.statusCode = 404;
      throw error;
    }

    if (account.UserId !== req.userId) {
      const error = new Error('Forbidden');
      error.statusCode = 403;
      throw error;
    }

    const transactions = await account.getTransactions({ where: { id: transactionId } });
    const transaction = transactions[0];

    if (!transaction) {
      const error = new Error('Transaction not found');
      error.statusCode = 404;
      throw error;
    }

    await transaction.destroy();

    res.sendStatus(204);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
