const express = require("express");
const supertest = require("supertest");
const accountsRouter = require("../../../src/infrastructure/rest/accounts/accounts.js");

const prepareTestScenario = () => {
  const app = express();
  const router = express.Router();
  const routes = accountsRouter(router);
  app.use(routes);

  return supertest(app);
};

describe("Accounts end points", () => {
  it("Should return a valid response with an collection of account resources", async (done) => {
    const request = prepareTestScenario();
    const res = await request.get("/accounts");

    expect(res.status).toBe(200);
    expect(res.headers.hasOwnProperty("content-type")).toBe(true);
    expect(res.headers.hasOwnProperty("x-total-count")).toBe(true);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    done();
  });
});
