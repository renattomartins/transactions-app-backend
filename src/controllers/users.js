const User = require('../models/User');
const userProvider = require('../infrastructure/sequelize/user-provider');

const buildLocation = (req, resourceId) =>
  `${req.protocol}://${req.get('host')}/users/${resourceId}`;

exports.createUser = (req, res) => {
  const { email } = req.body;
  const pass = req.body.password;

  const user = new User(email, pass);
  user.store(userProvider);

  res.set('Location', buildLocation(req, user.getId()));
  res.status(201).json(user.toJson());
};
