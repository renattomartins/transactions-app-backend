const User = require('../models/user');

exports.getAccounts = async (req, res, next) => {
  try {
    const theOne = await User.findByPk(1);
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
    const theOne = await User.findByPk(1);
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
    const theOne = await User.findByPk(1);
    const account = await theOne.getAccounts({ where: { id: accountId } });

    if (!account[0]) {
      const error = new Error('Not found');
      error.statusCode = 404;
      throw error;
    }

    res.json(account[0]);
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.updateAccount = async (req, res) => {
  const { accountId } = req.params;
  const { name, icon, description, type, initialBalance, activated } = req.body;

  try {
    const theOne = await User.findByPk(1);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });

    if (accounts[0] !== undefined) {
      const account = accounts[0];

      account.name = name;
      account.icon = icon;
      account.description = description;
      account.type = type;
      account.initialBalance = initialBalance;
      account.activated = activated;

      const updatedAccount = await account.save();
      res.json(updatedAccount);
    } else res.status(404).json({ code: 404, message: 'Not found' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};

exports.partiallyUpdateAccount = async (req, res) => {
  const { accountId } = req.params;
  const { name, icon, description, type, initialBalance, activated } = req.body;

  try {
    const theOne = await User.findByPk(1);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });

    if (accounts[0] !== undefined) {
      const account = accounts[0];

      account.name = name || account.name;
      account.icon = icon || account.icon;
      account.description = description || account.description;
      account.type = type || account.type;
      account.initialBalance = initialBalance || account.initialBalance;
      account.activated = activated !== undefined ? activated : account.activated;

      const updatedAccount = await account.save();
      res.json(updatedAccount);
    } else res.status(404).json({ code: 404, message: 'Not found' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};

exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const theOne = await User.findByPk(1);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });

    if (accounts[0] !== undefined) {
      const account = accounts[0];

      await account.destroy();
      res.status(204).send();
    } else res.status(404).json({ code: 404, message: 'Not found' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};
