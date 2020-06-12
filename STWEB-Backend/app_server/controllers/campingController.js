/*
 * campingController.js
 * Controlador de las operaciones de las entradas de tipo
 * camping.
 */

var express = require('express');
var url = require('url');
var Camping = require('../models/camping');
var campingController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 campings, indicando
 * que 20 de ellos se quieren del listado total.
 */
campingController.getCampings = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const campings = await Camping.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(campings);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de campings.
 */
campingController.countCampings = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        await Camping.count({}, function(err, result) {
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
 * Añadir un nuevo camping.
 */
campingController.addCamping = async function(req, res) {
    var camping = new Camping(req.body);
    await camping.save(function (err, newHotel) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newHotel);
        }
    });
}

/*
 * Obtener un camping por su id.
 */
campingController.getCamping = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.param('id');
        const camping = await Camping.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(camping);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de campings por provincia, comarca y municipio,
 * indicando los 20 que se quieren del listado total que se obtiene.
 */
campingController.searchCampings = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        var queryData = url.parse(req.url, true).query;
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;

        if (province == "null") {
            province = "";
        }
        
        if (region == "null") {
            region = "";
        }
        
        if (municipality == "null") {
            municipality = "";
        }

        const campings = await Camping.find({'comun.provincia': new RegExp(province,'i'), 
                                            'comun.comcarca': new RegExp(region, 'i'), 
                                            'comun.municipio': new RegExp(municipality, 'i')},
                                        function(err) {
                                            if (err) {
                                                res.status(400);
                                                res.json({error: err.message}); 
                                            }
                                        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(campings);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = campingController;
