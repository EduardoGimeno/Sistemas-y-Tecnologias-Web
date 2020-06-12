var express = require('express');
var parserDataController = require('../controllers/parserDataController');
var router = express.Router();

router.get('/guide', parserDataController.guias);
router.get('/apartments', parserDataController.apartamentos);

module.exports = router;
