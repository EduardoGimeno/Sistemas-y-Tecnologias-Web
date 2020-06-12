var jwt = require('jsonwebtoken')
var keys = require('./config/keys')
var jwtinterface={};

jwtinterface.signtoken = function(user){
    return jwt.sign({ email : user.email},keys.jwtClave,{expiresIn : 1000});
}

jwtinterface.verifytoken = function(token){
    var decoded= {}
    try{
    const decoded = jwt.verify(token, keys.jwtClave)
    }
    catch (err){
        throw new Error("Invalid Token")
    }
}

jwtinterface.decodetoken = function(token){
    return jwt.decode(token);
}

module.exports = jwtinterface