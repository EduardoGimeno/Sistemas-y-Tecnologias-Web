var express = require('express');
var url = require("url");
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
        } else {
            res.status(200);
            res.json(newUser);
        }
    });
}

userController.getUser = async function(req, res) {
    var id = req.params.id;
    const user = await User.findById(id, function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'User not found'});
        }
    });
    res.status(200);
    res.json(user);
}

userController.updateUser = async function(req, res) {
    var user = new User(req.body);
    await User.findOneAndUpdate(user.id, user, function(err, newUser) {
        if (err) {
            res.status(500);
            res.json({error: 'Unable to update user'});
        } else {
            res.status(200);
            newUser.pais = user.pais;
            newUser.provincia = user.provincia;
            newUser.contrasena = user.contrasena;
            res.json(newUser);
        }
    });
}

userController.login = async function(req, res) {
    var queryData = url.parse(req.url, true).query;
    var email = queryData.email;
    var password = queryData.password;
    const user = await User.findOne({email: email}, function(err) {
        if (err) {
            res.status(400);
            res.json({error: 'email not found'});
        }
    });
    if (user.contrasena === password) {
        res.status(200);
        res.json(user);
    } else {
        res.status(400);
        res.json({error: 'password not correct'});
    }
}

module.exports = userController;