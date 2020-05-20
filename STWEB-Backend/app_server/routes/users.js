var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/', userController.getUsers);
router.get('/get/:id', userController.getUser);
router.get('/login', userController.login);
router.post('/add', userController.addUser);
router.put('/update', userController.updateUser);

module.exports = router;
