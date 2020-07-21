/*
 * informationPoints.js
 * Rutas para las operaciones del tipo de entrada punto de información.
 */

var express = require('express');
var informationPointController = require('../controllers/informationPointController');
var router = express.Router();

router.get('/getAll', informationPointController.getInformationPoints);
router.get('/count', informationPointController.countInformationPoints);
router.get('/get', informationPointController.getInformationPoint);
router.get('/search', informationPointController.searchInformationPoints);

module.exports = router;