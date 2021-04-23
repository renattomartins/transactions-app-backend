const express = require("express");
const supertest = require("supertest");
const transactionsRouter = require("../../../src/infrastructure/rest/transactions/transactions.js");

const prepareTestScenario = () => {
  const app = express();
  const router = express.Router();
  const routes = transactionsRouter(router);
  app.use(routes);

  return supertest(app);
};

describe("Transactions end points", () => {
  it("GET /accounts/:id/transactions should return a valid response with an collection of transaction resources", async (done) => {
    const request = prepareTestScenario();
    const res = await request.get("/accounts/3544/transactions");

    expect(res.status).toBe(200);
    expect(res.headers.hasOwnProperty("content-type")).toBe(true);
    expect(res.headers.hasOwnProperty("x-total-count")).toBe(true);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    done();
  });

//   it("GET /transactions/:id should return a valid response with an transaction resource", async (done) => {
//     const request = prepareTestScenario();
//     const res = await request.get("/transactions/3541");

//     expect(res.status).toBe(200);
//     expect(res.headers.hasOwnProperty("content-type")).toBe(true);
//     expect(res.headers["content-type"]).toMatch(/application\/json/);
//     done();
//   });

//   it("POST /transactions/:id should return a valid response with a new transaction resource", async (done) => {
//     const request = prepareTestScenario();
//     const res = await request.post("/transactions");

//     expect(res.status).toBe(201);
//     expect(res.headers.hasOwnProperty("content-type")).toBe(true);
//     expect(res.headers.hasOwnProperty("location")).toBe(true);
//     expect(res.headers["content-type"]).toMatch(/application\/json/);
//     done();
//   });

//   it("PUT /transactions/:id should return a valid response with a changed transaction resource", async (done) => {
//     const request = prepareTestScenario();
//     const res = await request.put("/transactions/3544");

//     expect(res.status).toBe(200);
//     expect(res.headers.hasOwnProperty("content-type")).toBe(true);
//     expect(res.headers["content-type"]).toMatch(/application\/json/);
//     done();
//   });

//   it("PATCH /transactions/:id should return a valid response with a parcially changed transaction resource", async (done) => {
//     const request = prepareTestScenario();
//     const res = await request.patch("/transactions/3544");

//     expect(res.status).toBe(200);
//     expect(res.headers.hasOwnProperty("content-type")).toBe(true);
//     expect(res.headers["content-type"]).toMatch(/application\/json/);
//     done();
//   });

//   it("DELETE /transactions/:id should return a valid response to represent a deleted transaction resource", async (done) => {
//     const request = prepareTestScenario();
//     const res = await request.delete("/transactions/3544");

//     expect(res.status).toBe(204);
//     done();
//   });
});
