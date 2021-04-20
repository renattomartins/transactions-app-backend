const app = require("../src/index.js");
const supertest = require("supertest");
const request = supertest(app);

describe("Jest sample", () => {
  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });

  it("Async test", async (done) => {
    // Do your async tests here

    done();
  });
});

describe("Supertest sample to test endpoints", () => {
  it("Gets the test endpoint", async (done) => {
    const res = await request.get("/accounts");

    expect(res.status).toBe(200);
    expect(res.headers.hasOwnProperty("content-type")).toBe(true);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    done();
  });
});
