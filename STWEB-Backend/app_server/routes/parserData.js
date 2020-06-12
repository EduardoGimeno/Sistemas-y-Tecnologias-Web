var express = require('express');
var parserDataController = require('../controllers/parserDataController');
var router = express.Router();

router.get('/guide', parserDataController.guias);
router.get('/apartments', parserDataController.apartamentos);
router.get('/puntoInformacion', parserDataController.puntoInformacion);
router.get('/restaurante', parserDataController.restaurante);
router.get()


module.exports = router;
