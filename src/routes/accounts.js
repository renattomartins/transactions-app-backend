const express = require('express');

const accountsController = require('../controllers/accounts');

const router = express.Router();

router.get('/accounts', accountsController.getAccounts);
router.post('/accounts', accountsController.createAccount);
router.get('/accounts/3541', accountsController.getAccount);
router.put('/accounts/3544', accountsController.updateAccount);
router.patch('/accounts/3544', accountsController.partiallyUpdateAccount);
router.delete('/accounts/3544', accountsController.deleteAccount);

module.exports = router;
