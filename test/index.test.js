const app = require("../src/index.js");
const supertest = require("supertest");
const request = supertest(app);

describe("Jest sample", () => {
  it("Testing to see if Jest works", () => {
    expect(1).toBe(1);
  });

  it("Async test", async (done) => {
    done();
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
