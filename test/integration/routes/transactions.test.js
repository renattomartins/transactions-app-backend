const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const transactionsRouter = require('../../../src/routes/transactions.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(transactionsRouter);

  return supertest(app);
};

describe('Transactions end points', () => {
  beforeAll(() => {
    jwt.verify = jest.fn().mockReturnValue({ user: 123, token: 'abc' });
  });

  it('GET /accounts/:id/transactions should return a valid response with an collection of transaction resources', async (done) => {
    const request = prepareTestScenario();
    const res = await request
      .get('/accounts/3544/transactions')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'x-total-count')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('POST /accounts/:id/transactions should return a valid response with a new transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request
      .post('/accounts/3544/transactions')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('GET /accounts/:id/transactions/:id should return a valid response with a transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request
      .get('/accounts/3544/transactions/12944')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('PUT /accounts/:id/transactions/:id should return a valid response with a changed transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request
      .put('/accounts/3544/transactions/12944')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('PATCH /accounts/:id/transactions/:id should return a valid response with a parcially changed transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request
      .patch('/accounts/3544/transactions/12944')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('DELETE /accounts/:id/transactions/:id should return a valid response to represent a deleted transaction resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request
      .delete('/accounts/3544/transactions/12944')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(204);
    done();
  });
});
