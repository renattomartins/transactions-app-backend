const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const usersRoutes = require('../../../src/routes/users.js');
const User = require('../../../src/models/user');

jest.mock('../../../src/models/user');

const prepareTestScenario = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(usersRoutes);

  return supertest(app);
};

let request;
beforeAll(() => {
  // setup
  request = prepareTestScenario();
});

describe('Users endpoints', () => {
  it('POST /users should return a valid response with a new user resource', async (done) => {
    // setup
    const mockedCreatedUser = {
      id: 13,
      email: 'renato@transactions.com',
      password: '1234',
      created: 'fake-date',
      modified: 'faka-date',
    };
    User.create = jest.fn().mockResolvedValueOnce(User);
    User.get = jest.fn().mockReturnValueOnce('13');
    User.toJSON = jest.fn().mockReturnValueOnce(mockedCreatedUser);
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    // exercise
    const res = await request.post('/users').set('Accept', 'application/json').send({
      email: 'renato@transactions.com',
      password: '1234',
      passwordVerification: '1234',
    });

    // verify
    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);

    // teardown
    mockConsoleLog.mockClear();
    done();
  });
});
