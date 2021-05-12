const routes = (router) => {
  router.get('/', (req, res) => {
    res.json({
      code: 0,
      message: 'Welcome to Transaction API',
      version: '1.0.0',
      resources: {
        account_url: `${req.protocol}://${req.get('host')}/accounts`,
      },
    });
  });

  return router;
};

module.exports = routes;
