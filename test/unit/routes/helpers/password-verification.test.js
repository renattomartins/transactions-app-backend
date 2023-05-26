const passVerification = require('../../../../src/routes/helpers/password-verification');

describe('Password Verification helper', () => {
  describe('When called', () => {
    it('Should return true if passwords match', () => {
      // setup
      const passConfirmation = '12345abc';
      const req = {
        req: {
          body: {
            password: '12345abc',
          },
        },
      };

      // exersice and verify
      expect(passVerification(passConfirmation, req)).toBe(true);
    });

    it('Should throw an error if passwords does not match', () => {
      // setup
      const passConfirmation = '12345abc';
      const req = {
        req: {
          body: {
            password: '12345',
          },
        },
      };

      // exersice and verify
      expect(() => {
        passVerification(passConfirmation, req);
      }).toThrow('Passwords have to match');
    });
  });
});
