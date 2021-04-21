const app = require("express")();
const healthCheckRoutes = require("../../../src/infrastructure/rest/healthCheck/index");
const supertest = require("supertest");
const request = supertest(app);

app.use(healthCheckRoutes);

describe("Proper functioning of HealthCheck endpoints", () => {
  it("GET /health", async (done) => {
    const res = await request.get("/health");

    expect(res.status).toBe(200);
    expect(res.text).toEqual("All good!");
    done();
  });
});
