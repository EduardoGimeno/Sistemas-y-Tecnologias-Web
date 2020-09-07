/*
 * media.js
 * Rutas para las operaciones de creación de csv.
 */

var express = require('express');
var mediaController = require('../controllers/mediaController');
var router = express.Router();

router.post('/csv', mediaController.getCSV);
router.post('/pdf', mediaController.getPDF);

module.exports = router;
