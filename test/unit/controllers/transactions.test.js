const transactionsController = require('../../../src/controllers/transactions');
const Account = require('../../../src/models/account');

describe('Transactions controllers', () => {
  describe('When getTransactions is called', () => {
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
      expect(Account.findByPk).toHaveBeenCalledTimes(1);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledTimes(1);
      expect(mockedAccountModel.getTransactions).toHaveBeenCalledWith(
        expectedTransactionsOrderConfig
      );
      expect(res.set).toHaveBeenCalledWith('X-Total-Count', mockedTransactionsList.length);
      expect(res.json).toHaveBeenCalledWith(mockedTransactionsList);

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
