const { validationResult } = require('express-validator');
const Account = require('../models/account');

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

  try {
    const account = await Account.findByPk(accountId);

    if (!account) {
      const error = new Error('Account not found');
      error.statusCode = 404;
      throw error;
    }

    // Valiadr se a conta pertence ao usuário logado (403)
    // Criar a transação (201)
    // Retornar a transação criada
    // Tratar erros de validação (400 ou 422)
    // Retornar o header Location com a URL da transação criada
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.getTransaction = (req, res) => {
  res.json({
    id: 12944,
    description: 'Lazer',
    amount: -27.0,
    date: '2013-08-02',
    notes: '',
    isIncome: false,
    createdAt: '2013-08-02 07:48:37',
    updatedAt: '2013-08-02 07:48:37',
    accountId: 3544,
  });
};

exports.updateTransaction = (req, res) => {
  res.json({
    id: 12944,
    description: 'Lazer',
    amount: -207.0,
    date: '2013-08-02',
    notes: '',
    isIncome: false,
    createdAt: '2013-08-02 07:48:37',
    updatedAt: '2021-04-27 07:27:56',
    accountId: 3544,
  });
};

exports.partiallyUpdateTransaction = (req, res) => {
  res.json({
    id: 12944,
    description: 'Lazer',
    amount: -207.0,
    date: '2013-08-02',
    notes: 'Uma nota sobre esse gasto',
    isIncome: false,
    createdAt: '2013-08-02 07:48:37',
    updatedAt: '2021-04-27 07:35:43',
    accountId: 3544,
  });
};

exports.deleteTransaction = (req, res) => {
  res.sendStatus(204);
};
