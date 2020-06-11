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
        var importedJSON;
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=65&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
                console.log(importedJSON[1][0]);
                res.status(200);
                res.json(body);
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = parserDataController;
