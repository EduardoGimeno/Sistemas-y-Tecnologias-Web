/*
 * touristOffices.js
 * Rutas para las operaciones del tipo de entrada oficina de turismo.
 */

var express = require('express');
var touristOfficeController = require('../controllers/touristOfficeController');
var router = express.Router();

router.get('/getAll', touristOfficeController.getTouristOffices);
router.get('/count', touristOfficeController.countTouristOffices);
router.get('/get', touristOfficeController.getTouristOffice);
router.get('/search', touristOfficeController.searchTouristOffices);

module.exports = router;