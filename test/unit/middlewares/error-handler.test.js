const errorHandler = require('../../../src/middlewares/error-handler');

describe('Error handler', () => {
  describe('When called', () => {
    let res;
    let mockConsoleLog;

    beforeAll(() => {
      // setup
      res = {
        set: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      // teardown
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
      mockConsoleLog.mockClear();
    });

    it('Should return a json response with a proper http error status code', () => {
      // setup
      const mockedError = {
        statusCode: 404,
        message: 'Not found',
        data: 'User does not exist',
      };

      // exersice
      errorHandler(mockedError, null, res);

      // verify
      expect.assertions(3);
      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Not found', data: 'User does not exist' });
    });

    it('Should return a json response with 500 http error status code as default', () => {
      // setup
      const mockedError = {
        message: 'Mocked error message',
        data: 'Mocked error data',
      };

      // exersice
      errorHandler(mockedError, null, res);

      // verify
      expect.assertions(3);
      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Mocked error message',
        data: 'Mocked error data',
      });
    });
  });
});
