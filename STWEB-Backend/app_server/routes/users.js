/*
 * users.js
 * Rutas para las operaciones de los usuarios.
 */

var express = require('express');
var userController = require('../controllers/userController');
var passport = require('passport');
var jwtinterface = require('../jsonwebtoken')
var router = express.Router();

router.get('/getAll', userController.getUsers);
router.get('/count', userController.countUsers);
router.get('/countByEmail', userController.countByEmail);
router.get('/get', userController.getUser);
router.get('/search', userController.searchUsers);
router.get('/getUser', userController.getUserToken);
router.post('/login', passport.authenticate('json'), (req,res) =>{
    var token = jwtinterface.signtoken(req.user);
    var responss = "Bearer " + token;
    if(req.user.activo == false || req.user.baneado == true){res.json({"error": "User not allow"})}
    res.json([{"token": responss},req.user]);
});
router.post('/add', userController.addUser);
router.post('/send', userController.sendMail);
router.post('/admin', userController.addAdmin);
router.put('/update', userController.updateUser);

module.exports = router;
