/*
 * shelters.js
 * Rutas para las operaciones del tipo de entrada refugio.
 */

var express = require('express');
var shelterController = require('../controllers/shelterController');
var router = express.Router();

router.get('/getAll', shelterController.getShelters);
router.get('/count', shelterController.countShelters);
router.get('/get', shelterController.getShelter);
router.get('/search', shelterController.searchShelters);

module.exports = router;