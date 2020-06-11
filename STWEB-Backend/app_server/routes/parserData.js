var express = require('express');
var parserDataController = require('../controllers/parserDataController');
var router = express.Router();

router.get('/guide', parserDataController.guias);

module.exports = router;
