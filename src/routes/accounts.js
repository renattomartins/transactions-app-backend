const express = require('express');

const isAuth = require('../middlewares/is-auth');
const accountsController = require('../controllers/accounts');

const router = express.Router();

router.get('/accounts', isAuth, accountsController.getAccounts);
router.post('/accounts', isAuth, accountsController.createAccount);
router.get('/accounts/:accountId', isAuth, accountsController.getAccount);
router.put('/accounts/:accountId', isAuth, accountsController.updateAccount);
router.patch('/accounts/:accountId', isAuth, accountsController.partiallyUpdateAccount);
router.delete('/accounts/:accountId', isAuth, accountsController.deleteAccount);

module.exports = router;
