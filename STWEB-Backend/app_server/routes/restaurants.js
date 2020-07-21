/*
 * resturants.js
 * Rutas para las operaciones del tipo de entrada restuarante.
 */

var express = require('express');
var restaurantController = require('../controllers/restaurantController');
var router = express.Router();

router.get('/getAll', restaurantController.getRestaurants);
router.get('/count', restaurantController.countRestaurants);
router.get('/get', restaurantController.getRestaurant);
router.get('/search', restaurantController.searchRestaurants);

module.exports = router;