/*
 * campings.js
 * Rutas para las operaciones del tipo de entrada camping.
 */

var express = require('express');
var campingController = require('../controllers/campingController');
var router = express.Router();

router.get('/', campingController.getCampings);
router.get('/count', campingController.countCampings);
router.get('/get', campingController.getCamping);
router.get('/search', campingController.searchCampings);
router.post('/add', campingController.addCamping);

module.exports = router;