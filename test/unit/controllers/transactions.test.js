const transactionsController = require('../../../src/controllers/transactions');
const Account = require('../../../src/models/account');

describe('Transactions controllers', () => {
  describe('When getTransactions is called', () => {
    it('Should set a response with a list of transactions and X-Total-Count HTTP header', async (done) => {
      const req = { params: { accountId: 123 }, userId: 10 };
      const res = { set: jest.fn(), json: jest.fn() };
      Account.findByPk = jest.fn().mockResolvedValueOnce({ UserId: 10 });

      await transactionsController.getTransactions(req, res, null);

      expect(res.set).toHaveBeenCalledWith('X-Total-Count', 0);
      expect(res.json).toHaveBeenCalledWith([]);

      done();
    });

    it('Should set an error code 403 if account id does not belongs to logged user', async (done) => {
      const req = { params: { accountId: 123 }, userId: 10 };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce({ UserId: 11 });

      await transactionsController.getTransactions(req, null, next);

      const forbiddenError = new Error('Forbidden');
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(forbiddenError);

      done();
    });

    it('Should set an error code 404 if account id does not exists', async (done) => {
      const req = { params: { accountId: 123 } };
      const next = jest.fn();
      Account.findByPk = jest.fn().mockResolvedValueOnce(null);

      await transactionsController.getTransactions(req, null, next);

      const notFoundError = new Error('Account not found');
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

      expect(genericError).toHaveProperty('statusCode');
      expect(genericError.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toBeCalledWith(genericError);

      done();
    });
  });
});
