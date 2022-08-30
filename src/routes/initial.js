const express = require('express');

const initialController = require('../controllers/initial');

const router = express.Router();

router.get('/', initialController.getInitial);

module.exports = router;
