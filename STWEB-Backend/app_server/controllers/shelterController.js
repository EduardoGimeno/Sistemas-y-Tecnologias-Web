var express = require('express');
var url = require("url");
var Shelter = require('../models/refugio');
var shelterController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

shelterController.getShelters = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const shelter = await Shelter.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.json(shelter);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

shelterController.countShelters = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        Shelter.count({}, function(err, result) {
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

shelterController.addShelter = async function(req, res) {
    var shelter = new Shelter(req.body);
    await shelter.save(function (err, newShelter) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newShelter);
        }
    });
}

shelterController.getShelter = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.params.id;
        const shelter = await Shelter.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(shelter);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

shelterController.searchShelters = async function(req, res) {
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

        const shelters = await Shelter.find({provincia: new RegExp(province,'i'), 
                                            region: new RegExp(region, 'i'), 
                                            municipio: new RegExp(municipality, 'i')},
                                            function(err) {
                                                if (err) {
                                                    res.status(400);
                                                    res.json({error: err.message}); 
                                                }
                                            });
        res.status(200);
        res.json(shelters);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = shelterController;