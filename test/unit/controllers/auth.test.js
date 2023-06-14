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
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
      next.mockClear();
      mockConsoleLog.mockClear();
    });

    it('Should set an error code 401 if email does not exist', async (done) => {
      // setup
      User.findOne = jest.fn().mockResolvedValueOnce(null);

      // exercise
      await authController.login(req, res, next);

      // verify
      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();

      // tear down
      done();
    });
  });
});
