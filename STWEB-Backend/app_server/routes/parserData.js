var express = require('express');
var parserDataController = require('../controllers/parserDataController');
var router = express.Router();

router.get('/', parserDataController.parserData);

module.exports = router;
