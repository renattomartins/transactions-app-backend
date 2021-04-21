const express = require("express");
const supertest = require("supertest");

const app = express();
const request = supertest(app);
const healthCheckIndex = require("../../../src/infrastructure/rest/healthCheck/index.js");
app.use(healthCheckIndex);

describe("Proper functioning of HealthCheck endpoints", () => {
  it("GET /health", async (done) => {
    const res = await request.get("/health");

    expect(res.status).toBe(200);
    expect(res.text).toEqual("All good!");
    done();
  });
});
