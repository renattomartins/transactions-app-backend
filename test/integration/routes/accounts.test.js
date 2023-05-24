const express = require('express');
const supertest = require('supertest');
const accountsRouter = require('../../../src/routes/accounts.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(accountsRouter);

  return supertest(app);
};

describe.skip('Accounts end points', () => {
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
