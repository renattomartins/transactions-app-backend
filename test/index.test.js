const app = require("../src/index.js");
const supertest = require("supertest");
const request = supertest(app);

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

describe("Initial endpoints", () => {
  it("GET /", async (done) => {
    const res = await request.get("/");

    expect(res.status).toBe(200);
    expect(res.headers.hasOwnProperty("content-type")).toBe(true);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    done();
  });

  it("GET /health", async (done) => {
    const res = await request.get("/health");

    expect(res.status).toBe(200);
    expect(res.text).toEqual("All good!");
    done();
  });
});
