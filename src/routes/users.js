const usersController = require('../controllers/usersController');

const routes = (router) => {
  router.post('/users', usersController.createUser);

  return router;
};

module.exports = routes;
