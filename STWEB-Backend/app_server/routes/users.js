var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', userController.getUsers);
router.get('/getUser/:id', userController.getUser);
router.post('/addUser', userController.addUser);

module.exports = router;
