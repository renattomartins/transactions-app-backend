const User = require('../models/user');

const buildLocation = (req, resourceId) =>
  `${req.protocol}://${req.get('host')}/users/${resourceId}`;

exports.createUser = (req, res) => {
  const { email } = req.body;
  const pass = req.body.password;

  User.create({
    email,
    password: pass,
  })
    .then((result) => {
      const userId = result.get('id');

      // eslint-disable-next-line no-console
      console.log(`Created User! ID: ${userId}`);

      res.set('Location', buildLocation(req, userId));
      res.status(201).json(result.toJSON());
    })
    .catch(() => {
      res.status(500).json({ code: 500, message: 'Internal Server Error' });
    });
};
