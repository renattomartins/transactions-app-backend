const authController = require('../../../src/controllers/auth');

describe('Auth controllers', () => {
  describe('When login is called', () => {
    it('Should set a response with a valid token', async (done) => {
      // setup
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // exercise
      await authController.login(null, res, null);

      // verify
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);

      // tear down
      done();
    });
  });
});
