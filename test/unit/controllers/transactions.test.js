const transactionsController = require('../../../src/controllers/transactions');

describe('Transactions controllers', () => {
  describe('When getTransactions is called', () => {
    it('Should set a response with a list of transactions and X-Total-Count HTTP header', async (done) => {
      // setup
      const res = {
        set: jest.fn(),
        json: jest.fn(),
      };

      // exercise
      await transactionsController.getTransactions(null, res, null);

      // verify
      expect(res.set).toHaveBeenCalledWith('X-Total-Count', 0);
      expect(res.json).toHaveBeenCalledWith([]);

      // teardown
      done();
    });
  });
});
