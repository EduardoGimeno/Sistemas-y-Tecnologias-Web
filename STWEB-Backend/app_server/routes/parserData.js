/*
 * parserData.js
 * Rutas para las operaciones de filtrado y guardado de datos.
 */

var express = require('express');
var parserDataController = require('../controllers/parserDataController');
var router = express.Router();

router.post('/guides', parserDataController.guias);
router.post('/apartments', parserDataController.apartamentos);
router.post('/informationPoints', parserDataController.puntosInformacion);
router.post('/restaurants', parserDataController.restaurantes);
router.post('/ruralHouses', parserDataController.alojamientosTurismoRural);
router.post('/touristOffices',  parserDataController.oficinasTurismo);
router.post('/hotels', parserDataController.hoteles);
router.post('/campings', parserDataController.campings);
router.post('/shelters', parserDataController.refugios);


module.exports = router;
