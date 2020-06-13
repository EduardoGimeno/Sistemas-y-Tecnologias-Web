/*
 * hotelController.js
 * Controlador de las operaciones de las entradas de tipo
 * hotel.
 */

var express = require('express');
var url = require('url');
var Hotel = require('../models/hotel');
var hotelController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 hoteles, indicando
 * que 20 de ellos se quieren del listado total.
 */
hotelController.getHotels = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const hotels = await Hotel.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(hotels);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de hoteles.
 */
hotelController.countHotels = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await Hotel.count({}, function(err, result) {
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
 * Añadir un nuevo hotel.
 */
hotelController.addHotel = async function(req, res) {
    var hotel = new Hotel(req.body);
    await hotel.save(function (err, newHotel) {
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
 * Obtener un hotel por su id.
 */
hotelController.getHotel = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var id = req.param('id');
        const hotel = await Hotel.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(hotel);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de hoteles por provincia, comarca, municipio,
 * y rango de estrellas, indicando los 20 que se quieren del listado 
 * total que se obtiene.
 */
hotelController.searchHotels = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        var queryData = url.parse(req.url, true).query;
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;
        var minStars = queryData.minStars;
        var maxStars = queryData.maxStars;

        const hotels = await Hotel.find({'comun.provincia': new RegExp(province,'i'),
                                        'comun.comarca': new RegExp(region, 'i'),
                                        'comun.municipio': new RegExp(municipality, 'i'),
                                        estrellas: {$gte: minStars, $lte: maxStars}},
                                        function(err) {
                                            if (err) {
                                                res.status(500);
                                                res.json({error: err.message}); 
                                            }
                                        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(hotels);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}



module.exports = hotelController;
