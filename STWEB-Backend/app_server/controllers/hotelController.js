var express = require('express');
var url = require('url');
var Hotel = require('../models/hotel');
var hotelController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

hotelController.getHotels = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
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

hotelController.countHotels = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
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

hotelController.getHotel = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
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

hotelController.searchHotels = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        var queryData = url.parse(req.url, true).query;
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;
        var minStars = queryData.minStars;
        var maxStars = queryData.maxStars;

        if (province == "null") {
            province = "";
        }
        
        if (region == "null") {
            region = "";
        }
        
        if (municipality == "null") {
            municipality = "";
        }

        const hotels = await Hotel.find({provincia: new RegExp(province,'i'), 
                                        comcarca: new RegExp(region, 'i'), 
                                        municipio: new RegExp(municipality, 'i'),
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
