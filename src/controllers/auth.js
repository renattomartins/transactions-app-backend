const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const loadedUser = await User.scope('comparePassword').findOne({ where: { email } });

    if (!loadedUser) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
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
