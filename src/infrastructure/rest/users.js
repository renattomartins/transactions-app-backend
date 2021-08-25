const routes = (router, User) => {
  const buildLocation = (req, resourceId) =>
    `${req.protocol}://${req.get('host')}/users/${resourceId}`;

  router.post('/users', (req, res) => {
    const user = new User(req.body.email, req.body.password);
    user.store();
    res.set('Location', buildLocation(req, user.getId()));
    res.status(201).json(user.toJson());
  });

  return router;
};

module.exports = routes;
