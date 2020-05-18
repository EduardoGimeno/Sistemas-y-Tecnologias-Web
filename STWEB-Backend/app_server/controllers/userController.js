var express = require('express');
var User = require('../models/usuario');
var userController = {};

userController.getUsers= async function(req,res){
    const user = await User.find();
    res.json(user);
}

userController.addUser = async function(req , res){
    var user= new User(req.body);
    user.baneado = false;
    user.activo = true;
    await user.save(function (err) {
        if (err) res.json({status:'User not created'});
    })
    res.json({status:'User created'});
}

module.exports = userController;