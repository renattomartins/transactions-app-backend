const User = require('../models/user');

const buildLocation = (req, resourceId) =>
  `${req.protocol}://${req.get('host')}/users/${resourceId}`;

const removePasswordField = (userJson) => {
  // eslint-disable-next-line no-param-reassign
  delete userJson.password;
  return userJson;
};

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const userId = user.get('id');

    // eslint-disable-next-line no-console
    console.log(`Created User! ID: ${userId}`);

    res.set('Location', buildLocation(req, userId));
    res.status(201).json(removePasswordField(user.toJSON()));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};
