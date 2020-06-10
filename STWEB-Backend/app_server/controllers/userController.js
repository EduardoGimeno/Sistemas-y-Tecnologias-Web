var express = require('express');
var url = require('url');
var User = require('../models/usuario');
var jwtinterface = require('../jsonwebtoken')
var userController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

userController.getUsers = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const users = await User.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);;
        res.json(users);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

userController.countUsers = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        User.count({}, function(err, result) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.json(result);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

userController.addUser = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var user = new User(req.body);
        user.baneado = false;
        user.activo = true;
        await user.save(function (err, newUser) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(newUser);
            }
        });
    }
    catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

userController.getUser = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.params.id;
        const user = await User.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(user);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

userController.updateUser = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var user = new User(req.body);
        await User.findOneAndUpdate(user.id, user, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(user);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

userController.searchUsers = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var name = queryData.name;
        var surname = queryData.surname;
        var email = queryData.email;

        if (name == "null") {
            name = "";
        }
        
        if (surname == "null") {
            surname = "";
        }
        
        if (email == "null") {
            email = "";
        }

        const users = await User.find({nombre: new RegExp(name, 'i'), 
                                       apellidos: new RegExp(surname, 'i'), 
                                       email: new RegExp(email, 'i')},
                                       function(err) {
                                            if (err) {
                                                res.status(400);
                                                res.json({error: err.message}); 
                                            }
                                       });
        res.status(200);
        res.json(users);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = userController;