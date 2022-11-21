const User = require('../../../src/models/User');

describe('User', () => {
  let instance;

  beforeEach(() => {
    // exercise
    instance = new User();
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

  it('should have the property created', () => {
    // verify
    expect(instance).toHaveProperty('created');
  });

  it('should have the property modified', () => {
    // verify
    expect(instance).toHaveProperty('modified');
  });
});
