const User = require('./../models/user');

exports.getAccounts = async (req, res) => {
  try {
    const theOne = await User.findByPk(1);
    const accounts = await theOne.getAccounts();

    res.set('X-Total-Count', accounts.length);
    res.json(accounts);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};

exports.createAccount = async (req, res) => {
  const { name, icon, description, type, initialBalance, activated } = req.body;
  try {
    const theOne = await User.findByPk(1);
    const account = await theOne.createAccount({
      name: name,
      icon: icon,
      description: description,
      type: type,
      initialBalance: initialBalance,
      activated: activated,
    });
    const location = `${req.protocol}://${req.get('host')}/accounts/${account.id}`;

    res.set('Location', location);
    res.status(201).json(account);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};

exports.getAccount = async (req, res) => {
  const accountId = req.params.accountId;

  try {
    const theOne = await User.findByPk(1);
    const account = await theOne.getAccounts({ where: { id: accountId } });

    if (account[0] != undefined) res.json(account[0]);
    else res.status(404).json({ code: 404, message: 'Not found' });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};

exports.updateAccount = async (req, res) => {
  const accountId = req.params.accountId;
  const { name, icon, description, type, initialBalance, activated } = req.body;

  try {
    const theOne = await User.findByPk(1);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });

    if (accounts[0] != undefined) {
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
  const accountId = req.params.accountId;
  const { name, icon, description, type, initialBalance, activated } = req.body;

  try {
    const theOne = await User.findByPk(1);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });

    if (accounts[0] != undefined) {
      const account = accounts[0];

      account.name = name ? name : account.name;
      account.icon = icon ? icon : account.icon;
      account.description = description ? description : account.description;
      account.type = type ? type : account.type;
      account.initialBalance = initialBalance ? initialBalance : account.initialBalance;
      account.activated = activated != undefined ? activated : account.activated;

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
  const accountId = req.params.accountId;

  try {
    const theOne = await User.findByPk(1);
    const accounts = await theOne.getAccounts({ where: { id: accountId } });

    if (accounts[0] != undefined) {
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
