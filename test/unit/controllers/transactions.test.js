const expressValidator = require('express-validator');
const transactionsController = require('../../../src/controllers/transactions');
const Account = require('../../../src/models/account');

jest.mock('express-validator');

describe('Transactions controllers', () => {
  describe('When getTransactions is called', () => {
    beforeAll(() => {
      expressValidator.validationResult.mockReturnValue(expressValidator.Result);
      expressValidator.Result.isEmpty = jest.fn().mockReturnValue(true);
      expressValidator.Result.array = jest.fn().mockReturnValue([
        {
          type: 'field',
          value: 'a23',
          msg: 'Account ID must be numeric',
          path: 'accountId',
          location: 'params',
        },
      ]);
    });

    afterEach(() => {
      expressValidator.validationResult.mockClear();
      expressValidator.Result.isEmpty.mockClear();
      expressValidator.Result.array.mockClear();
    });

    it('Should set a response with a list of transactions and X-Total-Count HTTP header', async (done) => {
      const req = { params: { accountId: 123 }, userId: 10 };
      const res = { set: jest.fn(), json: jest.fn() };
      const mockedTransactionsList = [
        {
          id: 12943,
          description: 'Transferência para Cartão Master 5384',
          amount: -159.9,
          date: '2013-08-02 10:05:00',
          notes: '',
          isIncome: false,
          AccountId: 3544,
          createdAt: '2013-08-02 07:48:37',
          updatedAt: '2013-08-02 07:48:37',
        },
        {
          id: 12944,
          description: 'Lazer',
          amount: -27.0,
          date: '2013-08-02 11:50:00',
          notes: '',
          isIncome: false,
          AccountId: 3544,
          createdAt: '2013-08-02 07:48:37',
          updatedAt: '2013-08-02 07:48:37',
        },
      ];
      const mockedAccountModel = {
        UserId: 10,
        getTransactions: jest.fn().mockResolvedValueOnce(mockedTransactionsList),
      };

      Account.findByPk = jest.fn().mockResolvedValueOnce(mockedAccountModel);

      await transactionsController.getTransactions(req, res, null);

      const expectedTransactionsOrderConfig = { order: [['date', 'DESC']] };
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(Account.findByPk).toHaveBeenCalledTimes(1);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledTimes(1);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledWith(
        expectedTransactionsOrderConfig
      );
      expect(res.set).toHaveBeenCalledWith('X-Total-Count', mockedTransactionsList.length);
      expect(res.json).toHaveBeenCalledWith(mockedTransactionsList);

      done();
    });

    it('Should set an error code 400 if account id is not numeric', async (done) => {
      const req = { params: { accountId: 'abc' } };
      const next = jest.fn();
      expressValidator.Result.isEmpty.mockImplementationOnce(() => false);

      await transactionsController.getTransactions(req, null, next);

      const badRequestError = new Error('Bad request');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(badRequestError);

      done();
    });

    it('Should set an error code 403 if account id does not belong to logged user', async (done) => {
      const req = { params: { accountId: 123 }, userId: 10 };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce({ UserId: 11 });

      await transactionsController.getTransactions(req, null, next);

      const forbiddenError = new Error('Forbidden');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(forbiddenError);

      done();
    });

    it('Should set an error code 404 if account id does not exist', async (done) => {
      const req = { params: { accountId: 123 } };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce(null);

      await transactionsController.getTransactions(req, null, next);

      const notFoundError = new Error('Account not found');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(notFoundError);

      done();
    });

    it('Should set an error code 500 due generic error', async (done) => {
      const req = { params: { accountId: 123 } };
      const next = jest.fn();
      const genericError = new Error('Generic error');
      Account.findByPk = jest.fn().mockRejectedValueOnce(genericError);

      await transactionsController.getTransactions(req, null, next);

      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(genericError).toHaveProperty('statusCode');
      expect(genericError.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(genericError);

      done();
    });
  });

  describe('When createTransaction is called', () => {
    beforeAll(() => {
      expressValidator.validationResult.mockReturnValue(expressValidator.Result);
      expressValidator.Result.isEmpty = jest.fn().mockReturnValue(true);
      expressValidator.Result.array = jest.fn();
    });

    afterEach(() => {
      expressValidator.validationResult.mockClear();
      expressValidator.Result.isEmpty.mockClear();
      expressValidator.Result.array.mockClear();
    });
    it('Should set a response with a new transaction and a proper Location HTTP header', async (done) => {
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
        AccountId: 123,
      };
      const req = {
        protocol: 'http',
        params: { accountId: 123 },
        userId: 10,
        body: mockedRequestBodyPayload,
        get: jest.fn().mockReturnValue('localhost'),
      };
      const res = { set: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
      const createTransactionMock = jest.fn().mockResolvedValueOnce(mockedResponseBodyPayload);
      Account.findByPk = jest.fn().mockResolvedValueOnce({
        UserId: 10,
        createTransaction: createTransactionMock,
      });

      await transactionsController.createTransaction(req, res, null);

      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(Account.findByPk).toHaveBeenCalledTimes(1);
      expect(Account.findByPk).toBeCalledWith(123);
      expect(createTransactionMock).toBeCalledWith(mockedRequestBodyPayload);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockedResponseBodyPayload);
      expect(res.set).toHaveBeenCalledWith(
        'Location',
        'http://localhost/accounts/123/transactions/1254'
      );

      done();
    });

    it('Should set an error code 400 if account id is not numeric', async (done) => {
      const req = { params: { accountId: '2a2' } };
      const next = jest.fn();
      expressValidator.Result.isEmpty.mockImplementationOnce(() => false);
      expressValidator.Result.array.mockImplementationOnce(() => [
        {
          type: 'field',
          value: '2a2',
          msg: 'Account ID must be numeric',
          path: 'accountId',
          location: 'params',
        },
      ]);

      await transactionsController.createTransaction(req, null, next);

      const badRequestError = new Error('Bad request');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(badRequestError);

      done();
    });

    it('Should set an error code 403 if account id does not belong to logged user', async (done) => {
      const req = { params: { accountId: 123 }, userId: 10 };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce({ UserId: 11 });

      await transactionsController.createTransaction(req, null, next);

      const forbiddenError = new Error('Forbidden');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(forbiddenError);

      done();
    });

    it('Should set an error code 404 if account id does not exist', async (done) => {
      const req = { params: { accountId: 123 } };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce(null);

      await transactionsController.createTransaction(req, null, next);

      const notFoundError = new Error('Account not found');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(notFoundError);

      done();
    });

    it('Should set an error code 422 if transaction data is invalid', async (done) => {
      const req = { params: { accountId: '123' } };
      const next = jest.fn();
      expressValidator.Result.isEmpty.mockImplementationOnce(() => false);
      expressValidator.Result.array.mockImplementationOnce(() => [
        {
          type: 'field',
          msg: 'Field must not be empty',
          path: 'description',
          location: 'body',
        },
      ]);

      await transactionsController.createTransaction(req, null, next);

      const unprocessableEntityError = new Error('Unprocessable Entity');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(unprocessableEntityError);

      done();
    });

    it('Should set an error code 500 due generic error', async (done) => {
      const req = { params: { accountId: 123 } };
      const next = jest.fn();
      const genericError = new Error('Generic error');
      Account.findByPk = jest.fn().mockRejectedValueOnce(genericError);

      await transactionsController.createTransaction(req, null, next);

      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(genericError).toHaveProperty('statusCode');
      expect(genericError.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(genericError);

      done();
    });
  });

  describe('When getTransaction is called', () => {
    beforeAll(() => {
      expressValidator.validationResult.mockReturnValue(expressValidator.Result);
      expressValidator.Result.isEmpty = jest.fn().mockReturnValue(true);
      expressValidator.Result.array = jest.fn().mockReturnValue([
        {
          type: 'field',
          value: 'a23',
          msg: 'Account ID must be numeric',
          path: 'accountId',
          location: 'params',
        },
      ]);
    });

    afterEach(() => {
      expressValidator.validationResult.mockClear();
      expressValidator.Result.isEmpty.mockClear();
      expressValidator.Result.array.mockClear();
    });

    it('Should set a response with a transaction', async (done) => {
      const req = { params: { accountId: 123, transactionId: 1001 }, userId: 10 };
      const res = { json: jest.fn() };
      const mockedTransactionInArray = [
        {
          id: 1001,
          description: 'Conta de água',
          amount: 128.32,
          date: '2023-04-04T08:14:34.606Z',
          notes: 'Conta referente ao mês jul/2023',
          isIncome: true,
          createdAt: '2023-04-04T08:14:34.606Z',
          updatedAt: '2023-04-04T08:14:34.606Z',
          AccountId: 123,
        },
      ];
      const mockedAccountModel = {
        UserId: 10,
        getTransactions: jest.fn().mockResolvedValueOnce(mockedTransactionInArray),
      };

      Account.findByPk = jest.fn().mockResolvedValueOnce(mockedAccountModel);

      await transactionsController.getTransaction(req, res, null);

      const expectedTransactionsWhereClause = { where: { id: 1001 } };
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(Account.findByPk).toHaveBeenCalledTimes(1);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledTimes(1);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledWith(
        expectedTransactionsWhereClause
      );
      expect(res.json).toHaveBeenCalledWith(mockedTransactionInArray[0]);

      done();
    });

    it('Should set an error code 400 if account id is not numeric', async (done) => {
      const req = { params: { accountId: 'a23' } };
      const next = jest.fn();
      expressValidator.Result.isEmpty.mockImplementationOnce(() => false);

      await transactionsController.getTransaction(req, null, next);

      const badRequestError = new Error('Bad request');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(badRequestError);

      done();
    });

    it('Should set an error code 403 if account id does not belong to logged user', async (done) => {
      const req = { params: { accountId: 123, transactionId: 1001 }, userId: 10 };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce({ UserId: 11 });

      await transactionsController.getTransaction(req, null, next);

      const forbiddenError = new Error('Forbidden');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(forbiddenError);

      done();
    });

    it('Should set an error code 404 if account id does not exist', async (done) => {
      const req = { params: { accountId: 123, transactionId: 1001 } };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce(null);

      await transactionsController.getTransaction(req, null, next);

      const notFoundError = new Error('Account not found');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(notFoundError);

      done();
    });

    it('Should set an error code 404 if transaction id does not exist', async (done) => {
      const req = { params: { accountId: 123, transactionId: 1001 }, userId: 10 };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce({
        UserId: 10,
        getTransactions: jest.fn().mockResolvedValueOnce([]),
      });

      await transactionsController.getTransaction(req, null, next);

      const notFoundError = new Error('Transaction not found');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(notFoundError);

      done();
    });

    it('Should set an error code 500 due generic error', async (done) => {
      const req = { params: { accountId: 123, transactionId: 1001 } };
      const next = jest.fn();
      const genericError = new Error('Generic error');
      Account.findByPk = jest.fn().mockRejectedValueOnce(genericError);

      await transactionsController.getTransaction(req, null, next);

      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(genericError).toHaveProperty('statusCode');
      expect(genericError.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(genericError);

      done();
    });
  });

  describe('When updateTransaction is called', () => {
    let req;
    let res;
    let next;

    beforeAll(() => {
      req = {
        params: {
          accountId: 123,
          transactionId: 1001,
        },
        body: {
          description: 'Pix recebido',
          amount: 100.05,
          date: '2024-03-24T12:11:54.606Z',
          notes: '',
          isIncome: true,
        },
        userId: 10,
      };
      res = {
        json: jest.fn(),
      };
      next = jest.fn();

      expressValidator.validationResult.mockReturnValue(expressValidator.Result);
      expressValidator.Result.isEmpty = jest.fn().mockReturnValue(true);
      expressValidator.Result.array = jest.fn().mockReturnValue([
        {
          type: 'field',
          value: 'a23',
          msg: 'Account ID must be numeric',
          path: 'accountId',
          location: 'params',
        },
      ]);
    });

    afterEach(() => {
      res.json.mockClear();
      next.mockClear();
      expressValidator.validationResult.mockClear();
      expressValidator.Result.isEmpty.mockClear();
      expressValidator.Result.array.mockClear();
    });

    it('Should set a response with an updated transaction', async (done) => {
      const mockedTransactionModel = {
        id: 1001,
        description: 'Pix enviado',
        amount: 200,
        date: '2024-03-23T12:11:54.606Z',
        notes: 'Uma nota qualquer',
        isIncome: false,
        createdAt: '2024-03-23T12:11:54.606Z',
        updatedAt: '2024-03-23T12:11:54.606Z',
        AccountId: 123,
        save: jest.fn().mockResolvedValueOnce(),
      };

      const mockedAccountModel = {
        UserId: 10,
        getTransactions: jest.fn().mockResolvedValueOnce([mockedTransactionModel]),
      };

      Account.findByPk = jest.fn().mockResolvedValueOnce(mockedAccountModel);

      await transactionsController.updateTransaction(req, res, null);

      const expectedTransactionsWhereClause = { where: { id: 1001 } };

      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(Account.findByPk).toHaveBeenCalledTimes(1);
      expect(Account.findByPk).toBeCalledWith(123);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledTimes(1);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledWith(
        expectedTransactionsWhereClause
      );
      expect(mockedTransactionModel.save).toHaveBeenCalledTimes(1);
      expect(mockedTransactionModel.description).toBe(req.body.description);
      expect(mockedTransactionModel.amount).toBe(req.body.amount);
      expect(mockedTransactionModel.date).toBe(req.body.date);
      expect(mockedTransactionModel.notes).toBe(req.body.notes);
      expect(mockedTransactionModel.isIncome).toBe(req.body.isIncome);
      expect(res.json).toHaveBeenCalledTimes(1);

      done();
    });

    it('Should set an error code 400 if there is an validation error', async (done) => {
      expressValidator.Result.isEmpty.mockImplementationOnce(() => false);

      await transactionsController.updateTransaction(req, null, next);

      const badRequestError = new Error('Bad request');
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(badRequestError);

      done();
    });

    it('Should set an error code 403 if account id does not belong to logged user', async (done) => {
      Account.findByPk = jest.fn().mockResolvedValueOnce({ UserId: 11 });

      await transactionsController.updateTransaction(req, null, next);

      const forbiddenError = new Error('Forbidden');
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(forbiddenError);

      done();
    });

    it('Should set an error code 404 if account id does not exist', async (done) => {
      Account.findByPk = jest.fn().mockResolvedValueOnce(null);

      await transactionsController.updateTransaction(req, null, next);

      const notFoundError = new Error('Account not found');
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(notFoundError);

      done();
    });

    it('Should set an error code 404 if transaction id does not exist', async (done) => {
      Account.findByPk = jest.fn().mockResolvedValueOnce({
        UserId: 10,
        getTransactions: jest.fn().mockResolvedValueOnce([]),
      });

      await transactionsController.updateTransaction(req, null, next);

      const notFoundError = new Error('Transaction not found');
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(notFoundError);

      done();
    });

    it('Should set an error code 500 due generic error', async (done) => {
      const genericError = new Error('Generic error');
      Account.findByPk = jest.fn().mockRejectedValueOnce(genericError);

      await transactionsController.updateTransaction(req, null, next);

      expect(genericError).toHaveProperty('statusCode');
      expect(genericError.statusCode).toBe(500);
      expect(next).toBeCalledWith(genericError);
      done();
    });
  });
});
