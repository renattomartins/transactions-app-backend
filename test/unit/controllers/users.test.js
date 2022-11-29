const User = require('../../../src/models/User');
const usersController = require('../../../src/controllers/users.js');

jest.mock('../../../src/models/User');

describe('Users controllers', () => {
  describe('When createUser is called', () => {
    let req;
    let res;

    beforeAll(() => {
      // setup
      req = {
        protocol: 'http',
        body: {
          email: 'renato@transactions.com',
          password: '1234',
        },
        get: jest.fn().mockReturnValue('localhost'),
      };
      res = {
        set: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    afterEach(() => {
      // teardown
      User.mockClear();
      req.get.mockClear();
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
    });

    it('Should instantiate a new User', () => {
      // exercise
      usersController.createUser(req, res, null);
      // verify
      expect(User).toHaveBeenCalledTimes(1);
    });

    it('Should store a new User', () => {
      // exercise
      usersController.createUser(req, res, null);

      // verify
      const mockUserInstance = User.mock.instances[0];
      const mockUserStore = mockUserInstance.store;
      expect(mockUserStore).toHaveBeenCalledTimes(1);
    });

    it('Should set a proper response with location and json format', () => {
      // setup
      User.mockImplementationOnce(() => ({
        store: jest.fn(),
        getId: () => 123,
        toJson: jest.fn(),
      }));

      // exercise
      usersController.createUser(req, res, null);

      // verify
      expect(res.set).toHaveBeenCalledWith('Location', 'http://localhost/users/123');
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
