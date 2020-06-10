var express = require('express');
var restaurantController = require('../controllers/restaurantController');
var router = express.Router();

router.get('/', restaurantController.getRestaurants);
router.get('/count', restaurantController.countRestaurants);
router.get('/get', restaurantController.getRestaurant);
router.get('/search', restaurantController.searchRestaurants);
router.post('/add', restaurantController.addRestaurant);

module.exports = router;