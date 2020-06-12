var express = require('express');
var parserDataController = require('../controllers/parserDataController');
var router = express.Router();

router.get('/guide', parserDataController.guias);
router.get('/apartments', parserDataController.apartamentos);
router.get('/informationPoints', parserDataController.puntoInformacion);
router.get('/restaurant', parserDataController.restaurante);
router.get('/ruralHouses', parserDataController.alojamientosTurismoRural);


module.exports = router;
