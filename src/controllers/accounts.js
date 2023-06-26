const User = require('../models/user');

exports.getAccounts = async (req, res, next) => {
  try {
    const theOne = await User.findByPk(req.userId);
    const accounts = await theOne.getAccounts();

    res.set('X-Total-Count', accounts.length);
    res.json(accounts);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.createAccount = async (req, res, next) => {
  const { name, icon, description, type, initialBalance, activated } = req.body;
  try {
    const theOne = await User.findByPk(req.userId);
    const account = await theOne.createAccount({
      name,
      icon,
      description,
      type,
      initialBalance,
      activated,
    });
    const location = `${req.protocol}://${req.get('host')}/accounts/${account.id}`;

    res.set('Location', location);
    res.status(201).json(account);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.getAccount = async (req, res, next) => {
  const { accountId } = req.params;

  try {
    const theOne = await User.findByPk(req.userId);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });
    const account = accounts[0];

    if (!account) {
      const error = new Error('Not found');
      error.statusCode = 404;
      throw error;
    }

    res.json(account);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.updateAccount = async (req, res, next) => {
  const { accountId } = req.params;
  const { name, icon, description, type, initialBalance, activated } = req.body;

  try {
    const theOne = await User.findByPk(req.userId);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });
    const account = accounts[0];

    if (!account) {
      const error = new Error('Not found');
      error.statusCode = 404;
      throw error;
    }

    account.name = name;
    account.icon = icon;
    account.description = description;
    account.type = type;
    account.initialBalance = initialBalance;
    account.activated = activated;

    const updatedAccount = await account.save();
    res.json(updatedAccount);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.partiallyUpdateAccount = async (req, res, next) => {
  const { accountId } = req.params;
  const { name, icon, description, type, initialBalance, activated } = req.body;

  try {
    const theOne = await User.findByPk(req.userId);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });
    const account = accounts[0];

    if (!account) {
      const error = new Error('Not found');
      error.statusCode = 404;
      throw error;
    }

    account.name = name || account.name;
    account.icon = icon || account.icon;
    account.description = description || account.description;
    account.type = type || account.type;
    account.initialBalance = initialBalance || account.initialBalance;
    account.activated = activated !== undefined ? activated : account.activated;

    const updatedAccount = await account.save();
    res.json(updatedAccount);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.deleteAccount = async (req, res, next) => {
  const { accountId } = req.params;

  try {
    const theOne = await User.findByPk(req.userId);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });
    const account = accounts[0];

    if (!account) {
      const error = new Error('Not found');
      error.statusCode = 404;
      throw error;
    }

    await account.destroy();
    res.status(204).send();
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
