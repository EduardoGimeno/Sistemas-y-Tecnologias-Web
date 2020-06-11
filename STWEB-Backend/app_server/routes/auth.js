var express = require('express');
var passport = require('passport');
var jwtinterface = require('../jsonwebtoken')
var auth = express.Router();

auth.get('/google', passport.authenticate('google', {scope : ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email']}));
auth.get('/google/callback', passport.authenticate('google'),  (req, res) => {
        var token = jwtinterface.signtoken(req.user);
        console.log(token)
        var responss = "Bearer " + token;
        res.json([{"token": responss},req.user])
    });

module.exports = auth;