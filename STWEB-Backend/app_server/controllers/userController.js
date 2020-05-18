var express = require('express');
var querystring = require('querystring');
var User = require('../models/usuario');
var userController = {};

userController.getUsers = async function(req ,res) {
    const user = await User.find();
    res.json(user);
}

userController.addUser = async function(req, res) {
    var user = new User(req.body);
    console.log(user);
    user.baneado = false;
    user.activo = true;
    console.log(user);
    console.log(req.body.nombre);
    res.json({status:'all fine'})
}

userController.getUser = async function(req, res) {
    var id = req.params.id;
    const user = await User.findById(id);
    console.log(id);
    res.status(200);
    res.json(user);
}

module.exports = userController;