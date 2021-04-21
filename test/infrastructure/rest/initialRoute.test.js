const app = require("express")();
const healthCheckRoutes = require("../../../src/infrastructure/rest/initialRoute/index");
const supertest = require("supertest");
const request = supertest(app);

app.use(healthCheckRoutes);

describe("Proper functioning of API entry point route", () => {
  it("GET /", async (done) => {
    const res = await request.get("/");

    expect(res.status).toBe(200);
    expect(res.headers.hasOwnProperty("content-type")).toBe(true);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    done();
  });
});
