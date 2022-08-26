const User = require('../models/User');

const routes = (router) => {
  const buildLocation = (req, resourceId) =>
    `${req.protocol}://${req.get('host')}/users/${resourceId}`;

  router.post('/users', (req, res, next) => {
    const user = new User(req.body.email, req.body.password);
    user.store();
    res.set('Location', buildLocation(req, user.getId()));
    res.status(201).json(user.toJson());
  });

  return router;
};

module.exports = routes;
