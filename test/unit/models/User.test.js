const User = require('../../../src/models/user');

describe('User', () => {
  describe('intanciation', () => {
    let instance;

    beforeAll(() => {
      // exercise
      instance = new User('renato@transactions.app', '123');
    });

    it('should create an instance of User', () => {
      // verify
      expect(instance).toBeInstanceOf(User);
    });

    it('should have the property id', () => {
      // verify
      expect(instance).toHaveProperty('id');
    });

    it('should have the property email', () => {
      // verify
      expect(instance).toHaveProperty('email');
    });

    it('should have the property password', () => {
      // verify
      expect(instance).toHaveProperty('password');
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
