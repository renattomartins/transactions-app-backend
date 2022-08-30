const express = require('express');
const supertest = require('supertest');
const initialRouter = require('../../src/routes/initial.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(initialRouter);

  return supertest(app);
};

describe('Proper functioning of API entry point route', () => {
  it('GET /', async (done) => {
    const request = prepareTestScenario();
    const res = await request.get('/');

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });
});
