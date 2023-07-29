const Account = require('../models/account');

exports.getTransactions = async (req, res, next) => {
  const { accountId } = req.params;

  try {
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

exports.createTransaction = (req, res) => {
  const location = `${req.protocol}://${req.get('host')}/accounts//3544/transactions/13004`;

  res.set('Location', location);
  res.status(201).json({
    id: 13004,
    description: 'Lazer',
    amount: -127.0,
    date: '2021-04-23',
    notes: '',
    isIncome: false,
    createdAt: '2021-04-23 08:27:37',
    updatedAt: '2021-04-23 08:27:37',
    accountId: 3544,
  });
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
