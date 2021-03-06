/*
 * touristOfficeController.js
 * Controlador de las operaciones de las entradas de tipo
 * oficina de turismo.
 */

var express = require('express');
var url = require('url');
var TouristOffice = require('../models/oficinaTurismo');
var touristOfficeController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 oficinas de turismo, indicando
 * que 20 de ellos se quieren del listado total.
 */
touristOfficeController.getTouristOffices = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        const touristOffices = await TouristOffice.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(touristOffices);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de oficinas de turismo.
 */
touristOfficeController.countTouristOffices = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await TouristOffice.count({}, function(err, result) {
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
 * Obtener una oficina de turismo por su id.
 */
touristOfficeController.getTouristOffice = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var id = queryData.id;
        const touristOffice = await TouristOffice.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(touristOffice);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de oficinas de turismo por provincia, comarca y municipio,
 * indicando los 20 que se quieren del listado total que se obtiene.
 */
touristOfficeController.searchTouristOffices = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        var province = queryData.province;
        var municipality = queryData.municipality;

        const touristOffices = await TouristOffice.find({provincia: new RegExp(province,'i'), 
                                                        municipio: new RegExp(municipality, 'i')},
                                                        function(err) {
                                                            if (err) {
                                                                res.status(400);
                                                                res.json({error: err.message}); 
                                                            }
                                                        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(touristOffices);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = touristOfficeController;
