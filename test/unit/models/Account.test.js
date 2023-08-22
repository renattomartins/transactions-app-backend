const Account = require('../../../src/models/account');

describe('Account', () => {
  describe('intanciation', () => {
    let instance;

    beforeAll(() => {
      // exercise
      instance = new Account();
    });

    it('should create an instance of Account', () => {
      // verify
      expect(instance).toBeInstanceOf(Account);
    });

    it('should have the property id', () => {
      // verify
      expect(instance).toHaveProperty('id');
    });

    it('should have the property name', () => {
      // verify
      expect(instance).toHaveProperty('name');
    });

    it('should have the property icon', () => {
      // verify
      expect(instance).toHaveProperty('icon');
    });

    it('should have the property description', () => {
      // verify
      expect(instance).toHaveProperty('description');
    });

    it('should have the property type', () => {
      // verify
      expect(instance).toHaveProperty('type');
    });

    it('should have the property initialBalance', () => {
      // verify
      expect(instance).toHaveProperty('initialBalance');
    });

    it('should have the property activated', () => {
      // verify
      expect(instance).toHaveProperty('activated');
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

  describe('AccountTypes', () => {
    it('should exist 6 account types', () => {
      // setup
      const types = {
        CHECKING_ACCOUNT: 1,
        SAVING_ACCOUNT: 2,
        INVESTMENT_ACCOUNT: 3,
        CREDIT_CARD: 4,
        MONEY: 5,
        OTHER: 6,
      };
      // verify
      expect(Account.AccountTypes).toEqual(types);
    });
  });

  describe('defaultFirstAccount', () => {
    it('should have correct initial attributes', () => {
      // setup
      const mockedDefaultFirstAccount = {
        name: 'Carteira',
        icon: 'icon-wallet',
        type: Account.AccountTypes.MONEY,
        initialBalance: 0,
        activated: true,
      };
      // verify
      expect(Account.defaultFirstAccount).toEqual(mockedDefaultFirstAccount);
    });
  });
});
