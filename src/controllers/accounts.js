const User = require('./../models/user');

exports.getAccounts = async (req, res) => {
  const theOne = await User.findByPk(1);
  const accounts = await theOne.getAccounts();
  res.set('X-Total-Count', accounts.length);
  res.json(accounts);
};

exports.createAccount = async (req, res) => {
  const theOne = await User.findByPk(1);
  const account = await theOne.createAccount({
    name: req.body.name,
    icon: req.body.icon,
    description: req.body.description,
    type: req.body.type,
    currentBalance: req.body.currentBalance,
    activated: req.body.activated,
  });
  const location = `${req.protocol}://${req.get('host')}/accounts/${account.id}`;

  res.set('Location', location);
  res.status(201).json(account);
};

exports.getAccount = async (req, res) => {
  const accountId = req.params.accountId;
  const theOne = await User.findByPk(1);
  const account = await theOne.getAccounts({ where: { id: accountId } });

  if (account[0] != undefined) res.json(account[0]);
  else res.status(404).json({ code: 404, message: 'Not found' });
};

exports.updateAccount = async (req, res) => {
  const accountId = req.params.accountId;
  const theOne = await User.findByPk(1);
  const accounts = await theOne.getAccounts({ where: { id: accountId } });

  if (accounts[0] != undefined) {
    const account = accounts[0];

    account.name = req.body.name;
    account.icon = req.body.icon;
    account.description = req.body.description;
    account.type = req.body.type;
    account.currentBalance = req.body.currentBalance;
    account.activated = req.body.activated;

    try {
      const updatedAccount = await account.save();

      res.json(updatedAccount);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error! ${e}`);

      res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
  } else res.status(404).json({ code: 404, message: 'Not found' });
};

exports.partiallyUpdateAccount = async (req, res) => {
  const accountId = req.params.accountId;
  const theOne = await User.findByPk(1);
  const account = await theOne.getAccounts({ where: { id: accountId } });

  if (account[0] != undefined) res.json(account[0]);
  else res.status(404).json({ code: 404, message: 'Not found' });
};

exports.deleteAccount = async (req, res) => {
  const accountId = req.params.accountId;
  const theOne = await User.findByPk(1);
  const account = await theOne.getAccounts({ where: { id: accountId } });

  if (account[0] != undefined) res.json(account[0]);
  else res.status(404).json({ code: 404, message: 'Not found' });
};
