const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const usersRoutes = require('../../src/routes/users.js');
const User = require('../../src/models/User');

jest.mock('../../src/models/User');

const prepareTestScenario = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(usersRoutes);

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
      passwordVerification: '1234',
    });
    const mockUserInstance = User.mock.instances[0];
    const mockStore = mockUserInstance.store;
    const mockGetId = mockUserInstance.getId;
    const mockToJson = mockUserInstance.toJson;

    expect(User).toHaveBeenCalledTimes(1);
    expect(mockStore).toHaveBeenCalledTimes(1);
    expect(mockGetId).toHaveBeenCalledTimes(1);
    expect(mockToJson).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });
});
