var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

router.get('/', userController.getUsers);
router.get('/get/:id', userController.getUser);
router.get('/login', userController.login);
router.get('/search', userController.searchUsers);
router.post('/add', userController.addUser);
router.put('/update', userController.updateUser);

module.exports = router;
