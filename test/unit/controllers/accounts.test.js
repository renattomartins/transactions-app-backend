const User = require('../../../src/models/user');
const Account = require('../../../src/models/account');
const accountsController = require('../../../src/controllers/accounts');

describe('Accounts controllers', () => {
  describe('When getAccounts is called', () => {
    it('Should set a response with a list of accounts and X-Total-Count HTTP header', async (done) => {
      // setup
      const res = {
        set: jest.fn(),
        json: jest.fn(),
      };
      const mockedAccountsList = [
        {
          id: 1,
          name: 'Banco Inter, C/C',
          icon: 'icon-inter',
          description: '',
          type: 1,
          initialBalance: 142.41,
          activated: true,
          createdAt: '2023-05-10T17:10:34.000Z',
          updatedAt: '2023-05-10T17:10:34.000Z',
          UserId: 1,
        },
        {
          id: 2,
          name: 'Banco Sicoob, C/C',
          icon: 'icon-inter',
          description: 'Banco para reserva de emergência',
          type: 1,
          initialBalance: 40012.32,
          activated: true,
          createdAt: '2023-05-10T17:10:42.000Z',
          updatedAt: '2023-05-10T17:12:10.000Z',
          UserId: 1,
        },
      ];
      User.findByPk = jest.fn().mockResolvedValueOnce(Account);
      Account.getAccounts = jest.fn().mockReturnValueOnce(mockedAccountsList);

      // exercise
      await accountsController.getAccounts(null, res, null);

      // verify
      expect.assertions(4);
      expect(User.findByPk).toHaveBeenCalledTimes(1);
      expect(Account.getAccounts).toHaveBeenCalledTimes(1);
      expect(res.set).toHaveBeenCalledWith('X-Total-Count', mockedAccountsList.length);
      expect(res.json).toHaveBeenCalledWith(mockedAccountsList);

      // teardown
      res.set.mockClear();
      res.json.mockClear();
      done();
    });

    it('Should set an error code 500 due generic error', async (done) => {
      // setup
      const next = jest.fn();
      const error = new Error('Generic error');
      User.findByPk = jest.fn().mockRejectedValueOnce(error);

      // exercise
      await accountsController.getAccounts(null, null, next);

      // verify
      expect.assertions(3);
      expect(error).toHaveProperty('statusCode');
      expect(error.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);

      // teardown
      done();
    });
  });

  describe('When createAccount is called', () => {
    let req;
    let res;
    let next;

    beforeAll(() => {
      // setup
      req = {
        protocol: 'http',
        body: {
          name: 'Banco Inter, C/C',
          icon: 'icon-inter',
          description: '',
          type: 1,
          initialBalance: 142.41,
          activated: true,
        },
        get: jest.fn().mockReturnValue('localhost'),
      };
      res = {
        set: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    afterEach(() => {
      // teardown
      req.get.mockClear();
      res.set.mockClear();
      res.status.mockClear();
      res.json.mockClear();
      next.mockClear();
    });

    it('Should set a response with created account and Location HTTP header', async (done) => {
      // setup
      const mockedAccount = {
        id: 1,
        name: 'Banco Inter, C/C',
        icon: 'icon-inter',
        description: '',
        type: 1,
        initialBalance: 142.41,
        activated: true,
        createdAt: '2023-05-10T17:10:34.000Z',
        updatedAt: '2023-05-10T17:10:34.000Z',
        UserId: 1,
      };
      User.findByPk = jest.fn().mockResolvedValueOnce(Account);
      Account.createAccount = jest.fn().mockResolvedValueOnce(mockedAccount);

      // exercise
      await accountsController.createAccount(req, res, next);

      // verify
      expect.assertions(9);
      expect(User.findByPk).toHaveBeenCalledTimes(1);
      expect(Account.createAccount).toHaveBeenCalledTimes(1);
      expect(Account.createAccount).toHaveBeenCalledWith({
        name: 'Banco Inter, C/C',
        icon: 'icon-inter',
        description: '',
        type: 1,
        initialBalance: 142.41,
        activated: true,
      });
      expect(res.set).toHaveBeenCalledTimes(1);
      expect(res.set).toHaveBeenCalledWith('Location', 'http://localhost/accounts/1');
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockedAccount);

      // teardown
      done();
    });

    it('Should set an error code 500 due generic error', async (done) => {
      // setup
      const error = new Error('Generic error');
      User.findByPk = jest.fn().mockRejectedValueOnce(error);

      // exercise
      await accountsController.createAccount(req, null, next);

      // verify
      expect.assertions(3);
      expect(error).toHaveProperty('statusCode');
      expect(error.statusCode).toBe(500);
      expect(next).toHaveBeenCalledTimes(1);

      // teardown
      done();
    });
  });

  describe.skip('Accounts controllers', () => {
    it('Should have unit test to getAccount endpoint', () => {
      // @todo
      // res.json({
      //   id: 3541,
      //   name: 'Bradesco, C/C',
      //   icon: 'icon-bradesco',
      //   description: '',
      //   type: 1,
      //   initialBalance: 2349.89,
      //   activated: true,
      //   created: '2012-06-13 19:05:15',
      //   modified: '2015-01-16 18:49:26',
      //   accountUrl: `${req.protocol}://${req.get('host')}/accounts/3541`,
      // });
    });

    it('Should have unit test to updateAccount endpoint', () => {
      // @todo
      // res.json({
      //   id: 3544,
      //   name: 'Banco Intermedium, C/C',
      //   icon: 'icon-inter',
      //   description: 'Banco para investimentos e reserva de emergência',
      //   type: 1,
      //   initialBalance: 10000.0,
      //   activated: true,
      //   created: '2021-04-09 08:13:15',
      //   modified: '2021-04-09 08:37:36',
      //   accountUrl: `${req.protocol}://${req.get('host')}/accounts/3544`,
      // });
    });

    it('Should have unit test to partiallyUpdateAccount endpoint', () => {
      // @todo
      // res.json({
      //   id: 3544,
      //   name: 'Banco Intermedium, C/C',
      //   icon: 'icon-inter',
      //   description: 'Banco para investimentos e reserva de emergência',
      //   type: 1,
      //   initialBalance: 10000.0,
      //   activated: false,
      //   created: '2021-04-09 08:13:15',
      //   modified: '2021-04-09 08:37:36',
      //   accountUrl: `${req.protocol}://${req.get('host')}/accounts/3544`,
      // });
    });

    it('Should have unit test to deleteAccount endpoint', () => {
      // @todo
      // res.sendStatus(204);
    });
  });
});
