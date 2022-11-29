const User = require('../../../src/models/User');

describe('User', () => {
  describe('intanciation', () => {
    let instance;

    beforeEach(() => {
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

    it('should have the property created', () => {
      // verify
      expect(instance).toHaveProperty('created');
    });

    it('should have the property modified', () => {
      // verify
      expect(instance).toHaveProperty('modified');
    });
  });

  describe('operations', () => {
    let instance;

    beforeEach(() => {
      // setup
      instance = new User('renato@transactions.app', '123');
    });

    it('should return an undefined id after new instance', () => {
      // exercise
      const id = instance.getId();

      // verify
      expect(id).toBeUndefined();
    });

    it('should return an id after store', () => {
      // exercise
      instance.store();
      const id = instance.getId();

      // verify
      expect(id).not.toBeUndefined();
    });

    it('should return a formatted User json when toJson is called', () => {
      // setup
      const mockedDate = new Date(2022, 10, 29, 8, 13, 27, 374);
      const newDateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);

      const expectedUserJson = {
        id: undefined,
        email: 'renato@transactions.app',
        created: '2022-11-29T11:13:27.374Z',
        modified: '2022-11-29T11:13:27.374Z',
      };

      // exercise
      instance = new User('renato@transactions.app', '123');
      const userJson = instance.toJson();

      // verify
      expect(userJson).toStrictEqual(expectedUserJson);

      // teardown
      newDateSpy.mockRestore();
    });
  });
});
