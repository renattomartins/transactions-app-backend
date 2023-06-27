const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const validationErrors = validationResult(req);

  try {
    if (!validationErrors.isEmpty()) {
      const error = new Error('Unprocessable Entity');
      error.statusCode = 422;
      error.details = validationErrors.array();
      throw error;
    }

    const loadedUser = await User.scope('comparePassword').findOne({ where: { email } });

    if (!loadedUser) {
      const error = new Error('Not found');
      error.statusCode = 404;
      throw error;
    }

    if (!(await bcrypt.compare(password, loadedUser.password))) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ token, userId: loadedUser.id });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
