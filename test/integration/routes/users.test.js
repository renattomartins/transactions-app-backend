const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const User = require('../../../src/models/user');
const usersRoutes = require('../../../src/routes/users.js');
const errorHandler = require('../../../src/middlewares/error-handler.js');

jest.mock('../../../src/models/user');

const prepareTestScenario = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(usersRoutes);
  app.use(errorHandler);

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
      password: '12345678a',
      createdAt: 'fake-date',
      updatedAt: 'faka-date',
    };
    User.create = jest.fn().mockResolvedValueOnce(User);
    User.get = jest.fn().mockReturnValueOnce('13');
    User.toJSON = jest.fn().mockReturnValueOnce(mockedCreatedUser);
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    // exercise
    const res = await request.post('/users').set('Accept', 'application/json').send({
      email: 'renato@transactions.com',
      password: '12345678a',
      passwordVerification: '12345678a',
    });

    // verify
    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const expectedResponseWithoutPasswordField = {
      id: 13,
      email: 'renato@transactions.com',
      createdAt: 'fake-date',
      updatedAt: 'faka-date',
    };
    expect(res.body).toEqual(expectedResponseWithoutPasswordField);

    // teardown
    mockConsoleLog.mockClear();
    done();
  });

  it('POST /users should return an error 422 if some fields are missing', async (done) => {
    // setup
    const expected422Payload = {
      code: 422,
      message: 'Unprocessable Entity',
      details: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'password',
          location: 'body',
        },
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'password',
          location: 'body',
        },
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'passwordVerification',
          location: 'body',
        },
      ],
    };
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    // exercise
    const res = await request.post('/users').set('Accept', 'application/json').send({
      email: 'renato@transactions.com',
    });

    // verify
    expect(res.status).toBe(422);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual(expected422Payload);

    // teardown
    mockConsoleLog.mockClear();
    done();
  });
});
