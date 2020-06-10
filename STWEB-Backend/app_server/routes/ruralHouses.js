var express = require('express');
var ruralHouseController = require('../controllers/ruralHouseController');
var router = express.Router();

router.get('/', ruralHouseController.getRuralHouses);
router.get('/count', ruralHouseController.countRuralHouses);
router.get('/get', ruralHouseController.getRuralHouses);
router.get('/search', ruralHouseController.searchRuralHouses);
router.post('/add', ruralHouseController.addRuralHouse);

module.exports = router;