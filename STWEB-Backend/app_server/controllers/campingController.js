var express = require('express');
var url = require('url');
var Camping = require('../models/camping');
var campingController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

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

        const campings = await Camping.find({provincia: new RegExp(province,'i'), 
                                        comcarca: new RegExp(region, 'i'), 
                                        municipio: new RegExp(municipality, 'i')},
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
