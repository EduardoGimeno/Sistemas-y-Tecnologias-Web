var express = require('express');
var hotelController = require('../controllers/hotelController');
var router = express.Router();

router.get('/', hotelController.getHotels);
router.post('/add', hotelController.addHotel);