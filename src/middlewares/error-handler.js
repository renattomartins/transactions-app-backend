// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Error! ${error}`);
  const code = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const { details } = error;
  res.status(code).json({ code, message, details });
};
