var express = require('express');
var url = require('url');
var request = require('request');
var parserDataController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

parserDataController.parserData = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var importedJSON = JSON.parse("vacio");
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=65&formato=json&name=Alojamientos%20hoteleros%20en%20la%20Comunidad' +
            '%20Aut%C3%B3noma%20de%20Arag%C3%B3n&nameRes=Alojamientos%20hoteleros%20en%20la' +
            '%20Comunidad%20Aut%C3%B3noma%20de%20Arag%C3%B3n', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                importedJSON = body;
                console.log(importedJSON);
            }
        })
        res.status(200);
        res.json(importedJSON);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = parserDataController;
