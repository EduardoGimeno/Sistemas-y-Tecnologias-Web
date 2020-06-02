var express = require('express');
var passport = require('passport');
var auth = express.Router();

auth.get('/google', passport.authenticate('google', {scope : ['https://www.googleapis.com/auth/userinfo.profile']}));
auth.get('/google/callback', passport.authenticate('google'),(req, res) => {
        res.send(req.user);
    });

module.exports = auth;