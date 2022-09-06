const usersController = require('../../src/controllers/users.js');

describe('Users controllers', () => {
  it('Should build location correctly', () => {
    const expectedProtocol = 'https';
    const expectedHost = 'localhost';
    const controllerName = 'users';

    const req = {
      protocol: 'https',
      get: jest.fn(() => ('localhost')) // @todo mock the function with parameter
    };
    const resourceId = '123';

    const location = usersController.buildLocation(req, resourceId);

    const expectedLocation = `${expectedProtocol}://${expectedHost}/${controllerName}/${resourceId}`;

    expect(req.get).toBeCalledWith('host'); // @todo and so remove this
    expect(location).toBe(expectedLocation);
  });
});
