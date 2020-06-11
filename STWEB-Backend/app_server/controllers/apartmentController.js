var express = require('express');
var url = require('url');
var Apartment = require('../models/apartamento');
var apartmentController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

apartmentController.getApartments = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const apartments = await Apartment.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(apartments);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

apartmentController.countApartments = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        await Apartment.count({}, function(err, result) {
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

apartmentController.addApartment = async function(req, res) {
    var apartment = new (req.body);
    await apartment.save(function (err, newApartment) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newApartment);
        }
    });
}

apartmentController.getApartment = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.params.id;
        const apartment = await Hotel.findById(id, function(err) {
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

apartmentController.searchApartment = async function(req, res) {
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

        const apartments = await Apartment.find({provincia: new RegExp(province,'i'), 
                                                comcarca: new RegExp(region, 'i'), 
                                                municipio: new RegExp(municipality, 'i')},
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