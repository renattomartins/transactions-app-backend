const User = require('../models/user');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const loadedUser = await User.findOne({ where: { email } });
    if (!loadedUser) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ ok: 'ok' });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
