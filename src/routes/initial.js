const express = require('express');
const isAuth = require('../middlewares/is-auth');

const initialController = require('../controllers/initial');

const router = express.Router();

router.get('/', isAuth, initialController.getInitial);

module.exports = router;
