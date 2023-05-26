module.exports = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Passwords have to match');
  }
  return true;
};
