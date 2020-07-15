/*
 * apartmentController.js
 * Controlador de las operaciones de las entradas de tipo
 * apartamento.
 */

var express = require('express');
var url = require('url');
var Apartment = require('../models/apartamento');
var apartmentController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 apartamentos, indicando
 * que 20 de ellos se quieren del listado total.
 */
apartmentController.getApartments = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        const apartments = await Apartment.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(apartments);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de apartamentos.
 */
apartmentController.countApartments = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await Apartment.count({}, function(err, result) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(result);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un apartamento por su id.
 */
apartmentController.getApartment = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var id = queryData.id;
        const apartment = await Apartment.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(apartment);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de apartamentos por provincia, comarca y municipio,
 * indicando los 20 que se quieren del listado total que se obtiene.
 */
apartmentController.searchApartment = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;

        const apartments = await Apartment.find({'comun.provincia': new RegExp(province,'i'), 
                                                'comun.comarca': new RegExp(region, 'i'), 
                                                'comun.municipio': new RegExp(municipality, 'i')},
                                                function(err) {
                                                    if (err) {
                                                        res.status(400);
                                                        res.json({error: err.message}); 
                                                    }
                                                }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(apartments);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = apartmentController;
