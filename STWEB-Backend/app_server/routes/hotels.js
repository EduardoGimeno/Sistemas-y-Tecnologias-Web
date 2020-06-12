/*
 * hotels.js
 * Rutas para las operaciones del tipo de entrada hotel.
 */

var express = require('express');
var hotelController = require('../controllers/hotelController');
var router = express.Router();

router.get('/', hotelController.getHotels);
router.get('/count', hotelController.countHotels);
router.get('/get', hotelController.getHotel);
router.get('/search', hotelController.searchHotels);
router.post('/add', hotelController.addHotel);

module.exports = router;