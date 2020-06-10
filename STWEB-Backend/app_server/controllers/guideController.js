var express = require('express');
var url = require('url');
var Guide = require('../models/guia');
var guideController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

guideController.getGuides = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const guides = Guide.find(function(err) {
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

guideController.countGuides = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        Guide.count({}, function(err, result) {
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

guideController.addGuide = async function(req, res) {
    var guide = new Guide(req.body);
    await hotel.save(function (err, newGuide) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newGuide);
        }
    });
}

guideController.getGuide = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.params.id;
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

guideController.searchGuides = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var idiom = queryData.idiom;

        const guides = await Hotel.find({idiom: new RegExp(idiom,'i')},
                                        function(err) {
                                            if (err) {
                                                res.status(400);
                                                res.json({error: err.message}); 
                                            }
                                        });
        res.status(200);
        res.json(guides);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = guideController;