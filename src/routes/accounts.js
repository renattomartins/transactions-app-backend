const express = require('express');

const accountsController = require('../controllers/accounts');

const router = express.Router();

router.get('/accounts', accountsController.getAccounts);
router.post('/accounts', accountsController.createAccount);
router.get('/accounts/:accountId', accountsController.getAccount);
router.put('/accounts/:accountId', accountsController.updateAccount);
router.patch('/accounts/:accountId', accountsController.partiallyUpdateAccount);
router.delete('/accounts/:accountId', accountsController.deleteAccount);

module.exports = router;
