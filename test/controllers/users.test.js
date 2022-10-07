const User = require('../../src/models/User');
const usersController = require('../../src/controllers/users.js');
jest.mock('../../src/models/User');

describe('Users controllers', () => {
  describe('When createUser is called', () => {

    let req, res;

    beforeAll(() => {
      req = {
        protocol: 'http',
        body: {
          email: 'renato@transactions.com',
          password: '1234'
        },
        get: jest.fn().mockReturnValue('localhost')
      };
      const res = {
        set: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });

    beforeEach(() => {
      User.mockClear();
      req.get.mockClear();
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
    })

    it('Should instantiate a new User', () => {
      usersController.createUser(req, res, null);
      expect(User).toHaveBeenCalledTimes(1);
    });

    it('Should store a new User', () => {
      usersController.createUser(req, res, null);

      const mockUserInstance = User.mock.instances[0];
      const mockUserStore = mockUserInstance.store;
      expect(mockUserStore).toHaveBeenCalledTimes(1);
    });

    it('Should set a proper response with location and json format', () => {
      User.mockImplementationOnce(() => {
        return {
          store: jest.fn(),
          getId: () => 123,
          toJson: jest.fn(),
        };
      });

      usersController.createUser(req, res, null);

      expect(res.set).toHaveBeenCalledWith('Location', "http://localhost/users/123");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });
});
