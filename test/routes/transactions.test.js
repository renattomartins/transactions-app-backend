const express = require('express');
const supertest = require('supertest');
const transactionsRouter = require('../../src/routes/transactions.js');

const prepareTestScenario = () => {
  const app = express();
  const router = express.Router();
  const routes = transactionsRouter(router);
  app.use(routes);

  return supertest(app);
};

describe('Transactions end points', () => {
  it('GET /accounts/:id/transactions should return a valid response with an collection of transaction resources', async (done) => {
    const request = prepareTestScenario();
    const res = await request.get('/accounts/3544/transactions');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'x-total-count')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('POST /accounts/:id/transactions should return a valid response with a new transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.post('/accounts/3544/transactions');

    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('GET /accounts/:id/transactions/:id should return a valid response with a transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.get('/accounts/3544/transactions/12944');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('PUT /accounts/:id/transactions/:id should return a valid response with a changed transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.put('/accounts/3544/transactions/12944');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('PATCH /accounts/:id/transactions/:id should return a valid response with a parcially changed transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.patch('/accounts/3544/transactions/12944');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('DELETE /accounts/:id/transactions/:id should return a valid response to represent a deleted transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.delete('/accounts/3544/transactions/12944');

    expect(res.status).toBe(204);
    done();
  });
});
