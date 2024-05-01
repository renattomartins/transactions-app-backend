const express = require('express');
const bodyParser = require('body-parser');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const Account = require('../../../src/models/account');
const transactionsRouter = require('../../../src/routes/transactions.js');
const errorHandler = require('../../../src/middlewares/error-handler.js');

jest.mock('../../../src/models/account');

const prepareTestScenario = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(transactionsRouter);
  app.use(errorHandler);

  return supertest(app);
};

describe('Transactions end points', () => {
  let request;
  beforeAll(() => {
    jwt.verify = jest.fn().mockReturnValue({ userId: 123, token: 'abc' });
    request = prepareTestScenario();
  });

  it('GET /accounts/:id/transactions should return a valid response with an collection of transaction resources', async (done) => {
    const mockedTransactionsList = [];
    const mockedAccountModel = {
      UserId: 123,
      getTransactions: jest.fn().mockResolvedValueOnce(mockedTransactionsList),
    };

    Account.findByPk = jest.fn().mockResolvedValueOnce(mockedAccountModel);

    const res = await request
      .get('/accounts/3544/transactions')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'x-total-count')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('POST /accounts/:id/transactions should return a valid response with a new transaction resource', async (done) => {
    const mockedRequestBodyPayload = {
      description: 'Conta de água',
      amount: 128.32,
      date: '2023-04-04T08:14:34.606Z',
      notes: 'Conta referente ao mês jul/2023',
      isIncome: true,
    };
    const mockedResponseBodyPayload = {
      id: 1254,
      description: 'Conta de água',
      amount: 128.32,
      date: '2023-04-04T08:14:34.606Z',
      notes: 'Conta referente ao mês jul/2023',
      isIncome: true,
      createdAt: '2023-04-04T08:14:34.606Z',
      updatedAt: '2023-04-04T08:14:34.606Z',
      AccountId: 3544,
    };
    const createTransactionMock = jest.fn().mockResolvedValueOnce(mockedResponseBodyPayload);
    Account.findByPk = jest.fn().mockResolvedValueOnce({
      UserId: 123,
      createTransaction: createTransactionMock,
    });
    const res = await request
      .post('/accounts/3544/transactions')
      .set({ Authorization: 'Bearer abc' })
      .send(mockedRequestBodyPayload);

    expect(res.status).toBe(201);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'location')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('POST /accounts/:id/transactions should return an error 422 if some fields are missing', async (done) => {
    const expected422Payload = {
      code: 422,
      message: 'Unprocessable Entity',
      details: [
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'description',
          location: 'body',
        },
        {
          type: 'field',
          msg: 'Must be a number',
          path: 'amount',
          location: 'body',
        },
        {
          type: 'field',
          msg: 'Must be a valid date',
          path: 'date',
          location: 'body',
        },
        {
          type: 'field',
          msg: 'Invalid value',
          path: 'isIncome',
          location: 'body',
        },
      ],
    };
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    const res = await request
      .post('/accounts/3544/transactions')
      .set({ Authorization: 'Bearer abc' })
      .send({});

    expect(res.status).toBe(422);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual(expected422Payload);

    mockConsoleLog.mockClear();
    done();
  });

  it('GET /accounts/:id/transactions/:id should return a valid response with a transaction resource', async (done) => {
    const mockedTransactionsList = [
      {
        id: 12944,
        description: 'Conta de água',
        amount: 128.32,
        date: '2023-04-04T08:14:34.606Z',
        notes: 'Conta referente ao mês jul/2023',
        isIncome: true,
        createdAt: '2023-04-04T08:14:34.606Z',
        updatedAt: '2023-04-04T08:14:34.606Z',
        AccountId: 3544,
      },
    ];
    const mockedAccountModel = {
      UserId: 123,
      getTransactions: jest.fn().mockResolvedValueOnce(mockedTransactionsList),
    };

    Account.findByPk = jest.fn().mockResolvedValueOnce(mockedAccountModel);

    const res = await request
      .get('/accounts/3544/transactions/12944')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    done();
  });

  it('PUT /accounts/:id/transactions/:id should return a valid response with a changed transaction resource', async (done) => {
    const mockedRequestBodyPayload = {
      description: 'Conta de água',
      amount: 128.32,
      date: '2023-04-04T08:14:34.606Z',
      notes: 'Conta referente ao mês jul/2023',
      isIncome: true,
    };
    const mockedResponseBodyPayload = {
      id: 1254,
      description: 'Conta de água',
      amount: 128.32,
      date: '2023-04-04T08:14:34.606Z',
      notes: 'Conta referente ao mês jul/2023',
      isIncome: true,
      createdAt: '2023-04-01T08:00:00.606Z',
      updatedAt: '2023-04-04T08:14:34.606Z',
      AccountId: 3544,
    };
    const mockedTransactionModel = {
      id: 1254,
      description: 'old-description',
      amount: 0,
      date: '2020-01-01T00:00:00.00Z',
      notes: 'old-notes',
      isIncome: false,
      createdAt: '2023-04-01T08:00:00.606Z',
      updatedAt: '2023-04-01T08:00:00.606Z',
      AccountId: 3544,
      save: jest.fn().mockResolvedValueOnce(mockedResponseBodyPayload),
    };

    const mockedAccountModel = {
      UserId: 123,
      getTransactions: jest.fn().mockResolvedValueOnce([mockedTransactionModel]),
    };

    Account.findByPk = jest.fn().mockResolvedValueOnce(mockedAccountModel);

    const res = await request
      .put('/accounts/3544/transactions/1254')
      .set({ Authorization: 'Bearer abc' })
      .send(mockedRequestBodyPayload);

    expect(res.status).toBe(200);
    expect(Object.prototype.hasOwnProperty.call(res.headers, 'content-type')).toBe(true);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual(mockedResponseBodyPayload);
    done();
  });

  it('DELETE /accounts/:id/transactions/:id should return a valid response to represent a deleted transaction resource', async (done) => {
    const res = await request
      .delete('/accounts/3544/transactions/12944')
      .set({ Authorization: 'Bearer abc' });

    expect(res.status).toBe(204);
    done();
  });
});
