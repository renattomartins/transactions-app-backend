const Transaction = require('../../../src/models/transaction');

describe('Transaction', () => {
  describe('intanciation', () => {
    let instance;

    beforeAll(() => {
      // exercise
      instance = new Transaction('renato@transactions.app', '123');
    });

    it('should create an instance of Transaction', () => {
      // verify
      expect(instance).toBeInstanceOf(Transaction);
    });

    it('should have the property id', () => {
      // verify
      expect(instance).toHaveProperty('id');
    });

    it('should have the property description', () => {
      // verify
      expect(instance).toHaveProperty('description');
    });

    it('should have the property ammount', () => {
      // verify
      expect(instance).toHaveProperty('amount');
    });

    it('should have the property date', () => {
      // verify
      expect(instance).toHaveProperty('date');
    });

    it('should have the property notes', () => {
      // verify
      expect(instance).toHaveProperty('notes');
    });

    it('should have the property isIncome', () => {
      // verify
      expect(instance).toHaveProperty('isIncome');
    });

    it('should have the property createdAt', () => {
      // verify
      expect(instance).toHaveProperty('createdAt');
    });

    it('should have the property updatedAt', () => {
      // verify
      expect(instance).toHaveProperty('updatedAt');
    });
  });
});
