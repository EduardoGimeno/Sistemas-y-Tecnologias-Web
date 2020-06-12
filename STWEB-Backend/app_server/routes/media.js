var express = require('express');
var mediaController = require('../controllers/mediaController');
var router = express.Router();

router.get('/csv', mediaController.getCSV);

module.exports = router;
