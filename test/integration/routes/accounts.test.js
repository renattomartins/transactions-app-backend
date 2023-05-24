const express = require('express');
const supertest = require('supertest');
const accountsRouter = require('../../../src/routes/accounts.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(accountsRouter);

  return supertest(app);
};

describe.skip('Accounts end points', () => {
  it('DELETE /accounts/:id should return a valid response to represent a deleted account resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.delete('/accounts/3544');

    expect(res.status).toBe(204);
    done();
  });
});
