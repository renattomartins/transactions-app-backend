const User = require('../../../src/core/users/User');

describe('User', () => {
  let instance;

  beforeEach(() => {
    instance = new User();
  });

  it('should create an instance of User', () => {
    expect(instance).toBeInstanceOf(User);
  });

  it('should have the property id', () => {
    expect(instance).toHaveProperty('id');
  });

  it('should have the property email', () => {
    expect(instance).toHaveProperty('email');
  });

  it('should have the property password', () => {
    expect(instance).toHaveProperty('password');
  });

  it('should have the property created', () => {
    expect(instance).toHaveProperty('created');
  });

  it('should have the property modified', () => {
    expect(instance).toHaveProperty('modified');
  });
});
