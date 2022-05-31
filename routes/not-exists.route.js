const express = require('express');
const router = express.Router();

const notExistsController = require('../controllers/not-exists.controller');

// = = = = = = = = = = = = = = = = = = = =

router.get('*', notExistsController);

module.exports = router;