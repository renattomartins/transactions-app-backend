const express = require('express');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const initialRouter = require('../../../src/routes/initial.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(initialRouter);

  return supertest(app);
};

describe('Proper functioning of API entry point route', () => {
  it('GET /', async (done) => {
    const request = prepareTestScenario();
    jwt.verify = jest.fn().mockReturnValueOnce({ user: 123, token: 'abc' });

    const res = await request.get('/').set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });
});
