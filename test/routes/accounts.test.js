const express = require('express');
const supertest = require('supertest');
const accountsRouter = require('../../src/routes/accounts.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(accountsRouter);

  return supertest(app);
};

describe('Accounts end points', () => {
  it('GET /accounts should return a valid response with an collection of account resources', async (done) => {
    const request = prepareTestScenario();
    const res = await request.get('/accounts');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'x-total-count')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('POST /accounts should return a valid response with a new account resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.post('/accounts');

    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('GET /accounts/:id should return a valid response with an account resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.get('/accounts/3541');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('PUT /accounts/:id should return a valid response with a changed account resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.put('/accounts/3544');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('PATCH /accounts/:id should return a valid response with a parcially changed account resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.patch('/accounts/3544');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('DELETE /accounts/:id should return a valid response to represent a deleted account resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.delete('/accounts/3544');

    expect(res.status).toBe(204);
    done();
  });
});
