var express = require('express');
var apartmentController = require('../controllers/apartmentController');
var router = express.Router();

router.get('/', apartmentController.getApartments);
router.get('/count', apartmentController.countApartments);
router.get('/get', apartmentController.getApartment);
router.get('/search', apartmentController.searchApartment);
router.post('/add', apartmentController.addApartment);

module.exports = router;
