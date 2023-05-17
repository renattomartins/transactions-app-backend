module.exports = (error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Error! ${error}`);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
};
