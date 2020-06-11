var express = require('express');
var url = require('url');
var TouristOffice = require('../models/oficinaTurismo');
var touristOfficeController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

touristOfficeController.getTouristOffices = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
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

touristOfficeController.countTouristOffices = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
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

touristOfficeController.addTouristOffice = async function(req, res) {
    var touristOffice = new TouristOffice(req.body);
    await touristOffice.save(function (err, newTouristOffice) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newTouristOffice);
        }
    });
}

touristOfficeController.getTouristOffice = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.param('id');
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

touristOfficeController.searchTouristOffices = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        var queryData = url.parse(req.url, true).query;
        var province = queryData.province;
        var region = queryData.region;

        if (province == "null") {
            province = "";
        }
        
        if (region == "null") {
            region = "";
        }

        const touristOffices = await TouristOffice.find({provincia: new RegExp(province,'i'), 
                                                        comcarca: new RegExp(region, 'i')},
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
