/*
 * guideController.js
 * Controlador de las operaciones de las entradas de tipo
 * guía.
 */

var express = require('express');
var url = require('url');
var Guide = require('../models/guia');
var guideController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 guías, indicando
 * que 20 de ellos se quieren del listado total.
 */
guideController.getGuides = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const guides = await Guide.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(guides);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de guías.
 */
guideController.countGuides = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        await Guide.count({}, function(err, result) {
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
 * Añadir un nuevo guía.
 */
guideController.addGuide = async function(req, res) {
    var guide = new Guide(req.body);
    await guide.save(function (err, newGuide) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newGuide);
        }
    });
}

/*
 * Obtener un guía por su id.
 */
guideController.getGuide = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.param('id');
        const guide = await Guide.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(guide);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de guías por idioma, indicando los 
 * 20 que se quieren del listado total que se obtiene.
 */
guideController.searchGuides = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        var queryData = url.parse(req.url, true).query;
        var idiom = queryData.idiom;

        const guides = await Guide.find({idiom: new RegExp(idiom,'i')},
                                        function(err) {
                                            if (err) {
                                                res.status(400);
                                                res.json({error: err.message}); 
                                            }
                                        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(guides);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = guideController;
