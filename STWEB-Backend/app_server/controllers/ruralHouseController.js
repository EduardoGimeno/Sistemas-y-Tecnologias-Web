/*
 * ruralHouseController.js
 * Controlador de las operaciones de las entradas de tipo
 * alojamiento de turismo rural.
 */

var express = require('express');
var url = require('url');
var RuralHouse = require('../models/alojamientoTurismoRural');
var ruralHouseController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 alojamientos de turismo rural, indicando
 * que 20 de ellos se quieren del listado total.
 */
ruralHouseController.getRuralHouses = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const ruralHouses = await RuralHouse.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(ruralHouses);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de alojamientos de turismo rural.
 */
ruralHouseController.countRuralHouses = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await RuralHouse.count({}, function(err, result) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(result);
            }
        });
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Añadir un nuevo alojamiento de turismo rural.
 */
ruralHouseController.addRuralHouse = async function(req, res) {
    var ruralHouse = new RuralHouse(req.body);
    await ruralHouse.save(function (err, newRuralHouse) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newRuralHouse);
        }
    });
}

/*
 * Obtener un alojamiento de turismo rural por su id.
 */
ruralHouseController.getRuralHouse = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var id = req.param('id');
        const ruralHouse = await RuralHouse.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(ruralHouse);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de alojamientos de turismo rural por provincia, 
 * comarca, municipio y rango de categoría, indicando los 20 que se 
 * quieren del listado total que se obtiene.
 */
ruralHouseController.searchRuralHouses = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        var queryData = url.parse(req.url, true).query;
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;
        var minSpikes = queryData.minSpikes;
        var maxSpikes = queryData.maxSpikes;

        const ruralHouses = await RuralHouse.find({'comun.provincia': new RegExp(province,'i'), 
                                                  'comun.comcarca': new RegExp(region, 'i'), 
                                                  'comun.municipio': new RegExp(municipality, 'i'),
                                                  espigas: {$gte: minSpikes, $lte: maxSpikes}},
                                                  function(err) {
                                                        if (err) {
                                                            res.status(400);
                                                            res.json({error: err.message}); 
                                                        }
                                                  }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(ruralHouses);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = ruralHouseController;
