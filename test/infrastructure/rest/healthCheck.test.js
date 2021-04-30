const express = require('express');
const supertest = require('supertest');
const healthCheckRouter = require('../../../src/infrastructure/rest/healthCheck/healthCheck.js');

const prepareTestScenario = () => {
  const app = express();
  const router = express.Router();
  const routes = healthCheckRouter(router);
  app.use(routes);

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
