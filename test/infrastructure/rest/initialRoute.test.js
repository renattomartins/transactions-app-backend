const express = require("express");
const supertest = require("supertest");

const app = express();
const request = supertest(app);
const initialRouteIndex = require("../../../src/infrastructure/rest/initialRoute/index.js");
app.use(initialRouteIndex);

describe("Proper functioning of API entry point route", () => {
  it("GET /", async (done) => {
    const res = await request.get("/");

    expect(res.status).toBe(200);
    expect(res.headers.hasOwnProperty("content-type")).toBe(true);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    done();
  });
});
