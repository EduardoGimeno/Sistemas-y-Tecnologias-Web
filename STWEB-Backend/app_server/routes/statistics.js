/*
 * statistics.js
 * Rutas para las operaciones de las estadísticas.
 */

var express = require('express');
var statisticsController = require('../controllers/statisticsController');
var router = express.Router();

router.get('/hotelsPerMunicipality', statisticsController.hotelsPerMunicipality);
router.get('/guidesIdiomPercentage', statisticsController.guidesIdiomPercentage);
router.get('/restaurantsCategoryPerRegion', statisticsController.restaurantsCategoryPerRegion);
router.get('/usersPerProvince', statisticsController.usersPerProvince);
router.get('/entriesPercentage', statisticsController.entriesPercentage);

module.exports = router;