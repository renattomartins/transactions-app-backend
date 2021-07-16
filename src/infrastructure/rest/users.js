const routes = (router) => {
  router.post('/users', (req, res) => {
    const location = `${req.protocol}://${req.get('host')}/users/1`;

    res.set('Location', location);
    res.status(201).json({
      id: 144,
      email: 'renatto.martins@gmail.com',
      password: 'f94a4f94a4f94a4f94a4f94a4f94a4f94a4',
      created: '2011-08-09 08:14:34',
      modified: '2015-07-05 22:40:17',
      account_url: location,
    });
  });

  return router;
};

module.exports = routes;
