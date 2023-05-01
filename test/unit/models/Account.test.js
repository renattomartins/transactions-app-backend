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

    it('should have the property currentAmount', () => {
      // verify
      expect(instance).toHaveProperty('currentAmount');
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
});
