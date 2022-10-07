const express = require('express');
const supertest = require('supertest');
const healthRouter = require('../../src/routes/health.js');

const prepareTestScenario = () => {
  const app = express();
  app.use(healthRouter);

  return supertest(app);
};

describe('Proper functioning of HealthCheck endpoints', () => {
  it('GET /health', async (done) => {
    const request = prepareTestScenario();
    const res = await request.get('/health');

    expect(res.status).toBe(200);
    expect(res.text).toEqual('All good!');
    done();
  });
});
