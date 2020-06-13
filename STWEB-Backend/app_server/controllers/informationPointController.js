/*
 * informationPointController.js
 * Controlador de las operaciones de las entradas de tipo
 * punto de información.
 */

var express = require('express');
var url = require('url');
var InformationPoint = require('../models/puntoInformacion');
var informationPointController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 puntos de información, indicando
 * que 20 de ellos se quieren del listado total.
 */
informationPointController.getInformationPoints = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const informationPoints = await InformationPoint.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(informationPoints);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de puntos de infromación.
 */
informationPointController.countInformationPoints = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await InformationPoint.count({}, function(err, result) {
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
 * Añadir un nuevo punto de información.
 */
informationPointController.addInformationPoint = async function(req, res) {
    var informationPoint = new InformationPoint(req.body);
    await informationPoint.save(function (err, newInformationPoint) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newInformationPoint);
        }
    });
}

/*
 * Obtener un punto de información por su id.
 */
informationPointController.getInformationPoint = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var id = req.param('id');
        const informationPoint = await InformationPoint.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(informationPoint);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de puntos de información por provincia, comarca y municipio,
 * indicando los 20 que se quieren del listado total que se obtiene.
 */
informationPointController.searchInformationPoints = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        var queryData = url.parse(req.url, true).query;
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;

        const informationPoints = await InformationPoint.find({'comun.provincia': new RegExp(province,'i'), 
                                                              'comun.comcarca': new RegExp(region, 'i'), 
                                                              'comun.municipio': new RegExp(municipality, 'i')},
                                        function(err) {
                                            if (err) {
                                                res.status(400);
                                                res.json({error: err.message}); 
                                            }
                                        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(informationPoints);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = informationPointController;
