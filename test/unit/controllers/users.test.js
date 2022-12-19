const bcrypt = require('bcryptjs');
const User = require('../../../src/models/user');
const usersController = require('../../../src/controllers/users.js');

describe('Users controllers', () => {
  describe('When createUser is called', () => {
    let req;
    let res;
    let mockConsoleLog;

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
      mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      // teardown
      req.get.mockClear();
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
      mockConsoleLog.mockClear();
    });

    it('Should set an error code 500 if the user can not be created', async (done) => {
      // setup
      User.create = jest.fn().mockRejectedValueOnce(new Error('Sequelize error'));
      bcrypt.hash = jest.fn().mockResolvedValueOnce('hash-password');

      // exercise
      await usersController.createUser(req, res, null);

      // verify
      expect.assertions(5);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ code: 500, message: 'Internal Server Error' });

      // teardown
      done();
    });

    it('Should set a http status code 201 if the user is created correctly', async (done) => {
      // setup
      const mockedCreatedUser = {
        id: 13,
        email: 'renato@transactions.com',
        password: '1234',
        created: 'fake-date',
        modified: 'faka-date',
      };
      User.create = jest.fn().mockResolvedValueOnce(User);
      User.get = jest.fn().mockReturnValueOnce('13');
      User.toJSON = jest.fn().mockReturnValueOnce(mockedCreatedUser);
      bcrypt.hash = jest.fn().mockResolvedValueOnce('hash-password');

      // exercise
      await usersController.createUser(req, res, null);

      // verify
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith({
        email: 'renato@transactions.com',
        password: 'hash-password',
      });
      expect(res.set).toHaveBeenCalledTimes(1);
      expect(res.set).toHaveBeenCalledWith('Location', 'http://localhost/users/13');
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockedCreatedUser);

      // teardown
      done();
    });
  });
});
