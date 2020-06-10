var express = require('express');
var informationPointController = require('../controllers/informationPointController');
var router = express.Router();

router.get('/', informationPointController.getInformationPoints);
router.get('/count', informationPointController.countInformationPoints);
router.get('/get', informationPointController.getInformationPoint);
router.get('/search', informationPointController.searchInformationPoints);
router.post('/add', informationPointController.addInformationPoint);

module.exports = router;