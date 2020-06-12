/*
 * ruralHouses.js
 * Rutas para las operaciones del tipo de entrada alojamiento de turismo rural.
 */

var express = require('express');
var ruralHouseController = require('../controllers/ruralHouseController');
var router = express.Router();

router.get('/', ruralHouseController.getRuralHouses);
router.get('/count', ruralHouseController.countRuralHouses);
router.get('/get', ruralHouseController.getRuralHouse);
router.get('/search', ruralHouseController.searchRuralHouses);
router.post('/add', ruralHouseController.addRuralHouse);

module.exports = router;
