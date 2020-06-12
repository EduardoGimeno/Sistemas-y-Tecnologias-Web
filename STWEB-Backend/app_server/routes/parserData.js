var express = require('express');
var parserDataController = require('../controllers/parserDataController');
var router = express.Router();

router.get('/guide', parserDataController.guias);
router.get('/apartments', parserDataController.apartamentos);
router.get('/informationPoints', parserDataController.puntosInformacion);
router.get('/restaurant', parserDataController.restaurantes);
router.get('/ruralHouses', parserDataController.alojamientosTurismoRural);
router.get('/touristOffice',  parserDataController.oficinasTurismo);
router.get('/hotels', parserDataController.hoteles);
router.get('/campings', parserDataController.campings);


module.exports = router;
