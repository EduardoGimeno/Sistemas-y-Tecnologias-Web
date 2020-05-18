var express = require('express');
var querystring = require('querystring');
var User = require('../models/usuario');
var userController = {};

userController.getUsers = async function(req, res) {
    const user = await User.find();
    res.json(user);
}

userController.addUser = async function(req, res){
    var user = new User(req.body);
    user.baneado = false;
    user.activo = true;
    await user.save(function (err, newUser) {
        if (err) {
            res.status(500);
            res.json({error: 'User not created'});
        }
        else {
            res.status(200);
            res.json(newUser.id);
        }
    })
}

userController.getUser = async function(req, res) {
    var id = req.params.id;
    const user = await User.findById(id, function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'User not found'});
        }
        else {
            res.status(200);
            res.json(user);
        }
    })
}

module.exports = userController;