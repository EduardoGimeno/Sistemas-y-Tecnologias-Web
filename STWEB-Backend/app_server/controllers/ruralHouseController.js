var express = require('express');
var RuralHouse = require('../models/alojamientoTurismoRural');
var hotelController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

ruralHouseController.getRuralHouses = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const ruralHouses = RuralHouse.find(function(err) {
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

ruralHouseController.countRuralHouses = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        RuralHouse.count({}, function(err, result) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.json(result);
            }
        });
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

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

ruralHouseController.getRuralHouse = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.params.id;
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

ruralHouseController.searchRuralHouse = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
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

        const ruralHouses = await RuralHouse.find({provincia: new RegExp(province,'i'), 
                                                  comcarca: new RegExp(region, 'i'), 
                                                  municipio: new RegExp(municipality, 'i')},
                                                  function(err) {
                                                        if (err) {
                                                            res.status(400);
                                                            res.json({error: err.message}); 
                                                        }
                                                  });
        res.status(200);
        res.json(ruralHouses);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = hotelController;