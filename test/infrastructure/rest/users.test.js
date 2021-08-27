const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const usersRoutes = require('../../../src/infrastructure/rest/users.js');
const User = require('../../../src/core/users/User');

const prepareTestScenario = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  const router = express.Router();
  const routes = usersRoutes(router, User);
  app.use(routes);

  return supertest(app);
};

let request;
beforeAll(() => {
  request = prepareTestScenario();
});

describe('Users endpoints', () => {
  it('POST /users should return a valid response with a new user resource', async (done) => {
    const res = await request.post('/users').set('Accept', 'application/json').send({
      email: 'renato@transactions.com',
      password: '1234',
      passwordVerification: '12345',
    });

    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });
});
