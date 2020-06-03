var jwt = require('jsonwebtoken')
var keys = require('./config/keys')
var jwtinterface={};

jwtinterface.signtoken = function(user){
    return jwt.sign({ email : user.email},keys.jwtClave,{expiresIn : 10});
}

module.exports = jwtinterface