const app = require("../src/index.js");

const countRegisteredRoutes = (expressApp) => {
  let registeredRoutesDirectilyViaApp = 0,
    registeredRoutesViaRouterMiddleware = 0;

  expressApp._router.stack.forEach((middleware) => {
    if (middleware.route) {
      registeredRoutesDirectilyViaApp++;
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        registeredRoutesViaRouterMiddleware++;
      });
    }
  });

  return registeredRoutesDirectilyViaApp + registeredRoutesViaRouterMiddleware;
};

describe("Express initial configuration", () => {
  it("Should have exactly 2 configured routes", () => {
    expect(countRegisteredRoutes(app)).toBe(2);
  });
});
