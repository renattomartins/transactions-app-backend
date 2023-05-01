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

exports.getAccount = (req, res) => {

};

exports.updateAccount = (req, res) => {
  
};

exports.partiallyUpdateAccount = (req, res) => {
  
};

exports.deleteAccount = (req, res) => {
  
};
