const bcrypt = require('bcryptjs');
const User = require('../../../src/models/user');
const authController = require('../../../src/controllers/auth');

describe('Auth controllers', () => {
  describe('When login is called', () => {
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
      };
      res = {
        set: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
      mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      // teardown
      User.scope.mockClear();
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
      next.mockClear();
      mockConsoleLog.mockClear();
    });

    it('Should set an error code 401 if email does not exist', async (done) => {
      // setup
      User.scope = jest.fn().mockReturnThis();
      User.findOne = jest.fn().mockResolvedValueOnce(null);

      // exercise
      await authController.login(req, res, next);

      // verify
      expect(User.scope).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);

      // tear down
      done();
    });

    it('Should set an error code 401 if password does not match', async (done) => {
      // setup
      User.scope = jest.fn().mockReturnThis();
      User.findOne = jest.fn().mockResolvedValueOnce(User);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

      // exercise
      await authController.login(req, res, next);

      // verify
      expect(User.scope).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);

      // tear down
      done();
    });

    it('Should set an error code 500 if a generic error occurs', async (done) => {
      // setup
      const error = new Error('Generic error');
      User.scope = jest.fn().mockReturnThis();
      User.findOne = jest.fn().mockRejectedValueOnce(error);

      // exercise
      await authController.login(req, res, next);

      // verify
      expect(User.scope).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(error).toHaveProperty('statusCode');
      expect(error.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);

      // teardown
      done();
    });
  });
});
