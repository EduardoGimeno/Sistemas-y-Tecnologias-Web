/*
 * guides.js
 * Rutas para las operaciones del tipo de entrada guía.
 */

var express = require('express');
var guideController = require('../controllers/guideController');
var router = express.Router();

router.get('/', guideController.getGuides);
router.get('/count', guideController.countGuides);
router.get('/get', guideController.getGuide);
router.get('/search', guideController.searchGuides);
router.post('/add', guideController.addGuide);

module.exports = router;