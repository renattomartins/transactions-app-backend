const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const { defaultFirstAccount } = require('../models/account');

const buildLocation = (req, resourceId) =>
  `${req.protocol}://${req.get('host')}/users/${resourceId}`;

const mountResponse = (userJson) => ({
  id: userJson.id,
  email: userJson.email,
  createdAt: userJson.createdAt,
  updatedAt: userJson.updatedAt,
});

exports.createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      const error = new Error('Unprocessable Entity');
      error.statusCode = 422;
      error.details = validationErrors.array();
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create(
      {
        email,
        password: hashedPassword,
        Accounts: [defaultFirstAccount],
      },
      {
        include: [User.associations.Accounts],
      }
    );
    const userId = user.get('id');

    // eslint-disable-next-line no-console
    console.log(`Created User! ID: ${userId}`);

    res.set('Location', buildLocation(req, userId));
    res.status(201).json(mountResponse(user.toJSON()));
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      e.statusCode = 409;
      e.details = [
        {
          type: e.errors[0].type,
          value: e.errors[0].value,
          msg: e.errors[0].message,
          path: e.errors[0].path,
          location: e.errors[0].origin,
        },
      ];
    }
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
