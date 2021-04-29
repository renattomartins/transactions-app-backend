const routes = (router) => {
  router.get('/', (req, res) => {
    res.json({
      code: 0,
      message: 'success',
      resources: {
        account_url: `${req.protocol}://${req.get('host')}/accounts`,
      },
    });
  });

  return router;
};

module.exports = routes;
