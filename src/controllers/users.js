const bcrypt = require('bcryptjs');
const User = require('../models/user');

const buildLocation = (req, resourceId) =>
  `${req.protocol}://${req.get('host')}/users/${resourceId}`;

const mountResponse = (userJson) => ({
  id: userJson.id,
  email: userJson.email,
  createdAt: userJson.createdAt,
  updatedAt: userJson.updatedAt,
});

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });
    const userId = user.get('id');

    // eslint-disable-next-line no-console
    console.log(`Created User! ID: ${userId}`);

    res.set('Location', buildLocation(req, userId));
    res.status(201).json(mountResponse(user.toJSON()));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error! ${e}`);

    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};
