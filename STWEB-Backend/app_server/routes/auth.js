/*
 * auth.js
 * Rutas para los métodos de autenticación.
 */

var express = require('express');
var passport = require('passport');
var jwtinterface = require('../jsonwebtoken')
var auth = express.Router();

auth.get('/google', passport.authenticate('google', {scope : ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']}));
auth.get('/google/callback', passport.authenticate('google'),  (req, res) => {
        var token = jwtinterface.signtoken(req.user);
        console.log(token)
        var responss = "Bearer " + token;
        //res.json([{"token": responss},req.user]);
        if(req.user.pais == null){res.redirect("https://turismoaragon.herokuapp.com/registry-google?token="+ token+"&id="+ req.user._id);}
        else{res.redirect("https://turismoaragon.herokuapp.com/index-user?token="+ token+"&id="+ req.user._id)};
    });

module.exports = auth;
