/*
 * statistics.js
 * Rutas para las operaciones de las estadísticas.
 */

var express = require('express');
var statisticsController = require('../controllers/statisticsController');
var router = express.Router();

router.get('/hotelsPerMunicipality', statisticsController.hotelsPerMunicipality);

module.exports = router;