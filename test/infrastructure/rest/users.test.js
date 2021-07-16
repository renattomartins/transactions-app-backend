const express = require('express');
const supertest = require('supertest');
const usersRoutes = require('../../../src/infrastructure/rest/users.js');

const prepareTestScenario = () => {
  const app = express();
  const router = express.Router();
  const routes = usersRoutes(router);
  app.use(routes);

  return supertest(app);
};

describe('Users endpoints', () => {
  it('POST /users should return a valid response with a new user resource', async (done) => {
    const request = prepareTestScenario();
    const res = await request.post('/users');

    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });
});
