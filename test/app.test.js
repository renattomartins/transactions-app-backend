const app = require('../src/app.js');

const countRegisteredRoutes = (expressApp) => {
  let registeredRoutesDirectilyViaApp = 0;
  let registeredRoutesViaRouterMiddleware = 0;

  // eslint-disable-next-line no-underscore-dangle
  expressApp._router.stack.forEach((middleware) => {
    if (middleware.route) {
      registeredRoutesDirectilyViaApp += 1;
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(() => {
        registeredRoutesViaRouterMiddleware += 1;
      });
    }
  });

  return registeredRoutesDirectilyViaApp + registeredRoutesViaRouterMiddleware;
};

describe('Express initial configuration', () => {
  it('Should have exactly 16 configured routes', () => {
    expect(countRegisteredRoutes(app)).toBe(16);
  });
});
