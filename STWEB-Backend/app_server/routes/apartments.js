/*
 * apartments.js
 * Rutas para las operaciones del tipo de entrada apartamento.
 */

var express = require('express');
var apartmentController = require('../controllers/apartmentController');
var router = express.Router();

router.get('/getAll', apartmentController.getApartments);
router.get('/count', apartmentController.countApartments);
router.get('/get', apartmentController.getApartment);
router.get('/search', apartmentController.searchApartment);

module.exports = router;
