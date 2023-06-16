const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const User = require('../../../src/models/user');
const authRoutes = require('../../../src/routes/auth.js');
const errorHandler = require('../../../src/middlewares/error-handler.js');

jest.mock('../../../src/models/user');

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
    // ... mockedAuthData
    User.scope = jest.fn().mockReturnThis();
    User.findOne = jest.fn().mockResolvedValueOnce(User);
    bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

    // exercise
    const res = await request.post('/login').set('Accept', 'application/json').send({
      email: 'renato@transactions.com',
      password: '12345678',
    });

    // verify
    expect(res.status).toBe(200);

    // teardown
    User.scope.mockClear();
    done();
  });
});
