var express = require('express');
var url = require('url');
var request = require('request');
var parserDataController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

parserDataController.alojamientoTurismoRural = async function(req, res) {}
parserDataController.apartamentos = async function(req, res) {}
parserDataController.camping = async function(req, res) {}
parserDataController.guias = async function(req, res) {}
parserDataController.hotel = async function(req, res) {}
parserDataController.oficinaTurismo = async function(req, res) {}
parserDataController.puntoInformacion = async function(req, res) {}
parserDataController.refugio = async function(req, res) {}
parserDataController.restaurante = async function(req, res) {}

parserDataController.parserData = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //alojamientoTurismoRural
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=73&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //apartamentos
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=66&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //camping
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=68&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //guias
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=69&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //hotel
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=65&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //oficinaTurismo
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=70&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //puntoInformacion
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=71&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //refugio
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=64&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
        //restaurante
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=67&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })

    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = parserDataController;
