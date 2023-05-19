module.exports = (error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Error! ${error}`);
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
};
