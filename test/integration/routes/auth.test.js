const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const authRoutes = require('../../../src/routes/auth.js');
const errorHandler = require('../../../src/middlewares/error-handler.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(authRoutes);
  app.use(errorHandler);

  return supertest(app);
};

let request;
beforeAll(() => {
  // setup
  request = prepareTestScenario();
});

describe('Auth endpoints', () => {
  it('POST /login should return a valid response with a token to log in', async (done) => {
    // setup

    // exercise
    const res = await request.post('/login').set('Accept', 'application/json').send({
      email: 'renato@transactions.com',
      password: '12345678',
    });

    // verify
    expect(res.status).toBe(200);

    // teardown
    done();
  });
});
