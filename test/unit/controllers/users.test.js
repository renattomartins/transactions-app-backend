const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const User = require('../../../src/models/user');
const { defaultFirstAccount } = require('../../../src/models/account');
const usersController = require('../../../src/controllers/users.js');

jest.mock('express-validator');

describe('Users controllers', () => {
  describe('When createUser is called', () => {
    let req;
    let res;
    let next;
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
      next = jest.fn();

      expressValidator.validationResult.mockReturnValue(expressValidator.Result);
      expressValidator.Result.isEmpty = jest.fn().mockReturnValue(true);
      expressValidator.Result.array = jest.fn().mockReturnValue([
        {
          type: 'field',
          msg: 'invalid field',
          path: 'email',
          location: 'body',
        },
      ]);

      mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      // teardown
      req.get.mockClear();
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
      next.mockClear();

      expressValidator.validationResult.mockClear();
      expressValidator.Result.isEmpty.mockClear();
      expressValidator.Result.array.mockClear();

      mockConsoleLog.mockClear();
    });

    it('Should set a http status code 201 if the user is created correctly', async (done) => {
      // setup
      const mockedCreatedUser = {
        id: 13,
        email: 'renato@transactions.com',
        password: '1234',
        createdAt: 'fake-date',
        updatedAt: 'faka-date',
      };
      User.create = jest.fn().mockResolvedValueOnce(User);
      User.associations.Accounts = jest.fn();
      User.get = jest.fn().mockReturnValueOnce('13');
      User.toJSON = jest.fn().mockReturnValueOnce(mockedCreatedUser);
      bcrypt.hash = jest.fn().mockResolvedValueOnce('hashed-password');

      // exercise
      await usersController.createUser(req, res, null);

      // verify
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith(
        {
          email: 'renato@transactions.com',
          password: 'hashed-password',
          Accounts: [defaultFirstAccount],
        },
        { include: [User.associations.Accounts] }
      );
      expect(res.set).toHaveBeenCalledTimes(1);
      expect(res.set).toHaveBeenCalledWith('Location', 'http://localhost/users/13');
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);

      // teardown
      User.create.mockClear();
      User.get.mockClear();
      User.toJSON.mockClear();
      done();
    });

    it('Should set an error code 409 if email already exists', async (done) => {
      // setup
      const error = new Error('Validation error');
      error.name = 'SequelizeUniqueConstraintError';
      error.errors = [
        { type: 'mock', value: 'mock', message: 'mock', path: 'mock', origin: 'mock' },
      ];
      User.create = jest.fn().mockRejectedValueOnce(error);

      // exercise
      await usersController.createUser(req, res, next);

      // verify
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(error).toHaveProperty('statusCode');
      expect(error.statusCode).toBe(409);
      expect(next).toHaveBeenCalledTimes(1);

      // teardown
      done();
    });

    it('Should set an error code 422 if any entry is invalid', async (done) => {
      // setup
      expressValidator.Result.isEmpty.mockImplementationOnce(() => false);
      User.create = jest.fn();

      // exercise
      await usersController.createUser(req, res, next);

      // verify
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledTimes(0);

      // teardown
      done();
    });

    it('Should set an error code 500 if the user can not be created due generic error', async (done) => {
      // setup
      const error = new Error('Generic error');
      User.create = jest.fn().mockRejectedValueOnce(error);

      // exercise
      await usersController.createUser(req, res, next);

      // verify
      expect(expressValidator.validationResult).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.isEmpty).toHaveBeenCalledTimes(1);
      expect(expressValidator.Result.array).toHaveBeenCalledTimes(0);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(error).toHaveProperty('statusCode');
      expect(error.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);

      // teardown
      done();
    });
  });
});
