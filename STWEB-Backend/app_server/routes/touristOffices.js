var express = require('express');
var touristOfficeController = require('../controllers/touristOfficeController');
var router = express.Router();

router.get('/', touristOfficeController.getTouristOffices);
router.get('/count', touristOfficeController.countTouristOffices);
router.get('/get', touristOfficeController.getTouristOffice);
router.get('/search', touristOfficeController.searchTouristOffices);
router.post('/add', touristOfficeController.addTouristOffice);

module.exports = router;