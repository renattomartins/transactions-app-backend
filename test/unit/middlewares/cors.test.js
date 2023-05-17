const cors = require('../../../src/middlewares/cors');

describe('CORs middleware', () => {
  describe('When called', () => {
    it('Should set proper http headers', () => {
      // setup
      const res = {
        setHeader: jest.fn(),
      };
      const next = jest.fn();

      // exersice
      cors(null, res, next);

      // verify
      expect.assertions(5);
      expect(res.setHeader).toHaveBeenCalledTimes(3);
      expect(res.setHeader).toBeCalledWith('Access-Control-Allow-Origin', '*');
      expect(res.setHeader).toBeCalledWith(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
      );
      expect(res.setHeader).toBeCalledWith(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
      );
      expect(next).toBeCalled();

      // teardown
      res.setHeader.mockClear();
      next.mockClear();
    });
  });
});
