const User = require('../../../src/models/user');
const usersController = require('../../../src/controllers/users.js');

jest.mock('../../../src/models/user');

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

    it('Should create a new User', () => {
      // setup
      User.create = jest.fn().mockReturnThis();
      User.then = jest.fn().mockResolvedValue(this);

      // exercise
      usersController.createUser(req, res, null);

      // verify
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith({
        email: 'renato@transactions.com',
        password: '1234',
      });
    });

    it.skip('Should set a 201 response with location and json format if email and password are correct', async () => {
      // setup
      const mockResolvedObject = {
        get: jest.fn().mockReturnValue('10'),
      };
      User.create = jest.fn().mockResolvedObject(Promise.resolve(mockResolvedObject));
      // User.then = jest.fn().mockResolvedValue(mockResolvedObject);

      // exercise
      usersController.createUser(req, res, null);

      // verify
      expect(res.set).toHaveBeenCalledTimes(1);
      // expect(res.set).toHaveBeenCalledWith('Location', 'http://localhost/users/123');
      // expect(res.status).toHaveBeenCalledWith(201);
      // expect(res.json).toHaveBeenCalledTimes(1);
    });

    it.skip('Should set a 500 error response if a DB error occurred on save', async () => {});
  });
});
