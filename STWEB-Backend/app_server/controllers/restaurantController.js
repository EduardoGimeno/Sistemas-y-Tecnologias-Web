var express = require('express');
var url = require('url');
var Restaurant = require('../models/restaurante');
var restaurantController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

restaurantController.getRestaurants = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var perPage = 20;
        var page = Math.max(0, req.param('page'));
        const restaurants = Restaurant.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(restaurants);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

restaurantController.countRestaurants = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        Restaurant.count({}, function(err, result) {
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

restaurantController.addRestaurant = async function(req, res) {
    var restaurant = new Restaurant(req.body);
    await restaurant.save(function (err, newRestaurant) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            res.status(200);
            res.json(newRestaurant);
        }
    });
}

restaurantController.getRestaurant = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var id = req.params.id;
        const restaurant = await Restaurant.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(restaurant);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

restaurantController.searchRestaurants = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;
        var minCategory = queryData.minCategory;
        var maxCategory = queryData.maxCategory;

        if (province == "null") {
            province = "";
        }
        
        if (region == "null") {
            region = "";
        }
        
        if (municipality == "null") {
            municipality = "";
        }

        const restaurants = await Restaurant.find({provincia: new RegExp(province,'i'), 
                                                   comcarca: new RegExp(region, 'i'), 
                                                   municipio: new RegExp(municipality, 'i'),
                                                   categoria: {$gte: minCategory, $lte: maxCategory}},
                                                   function(err) {
                                                        if (err) {
                                                            res.status(400);
                                                            res.json({error: err.message}); 
                                                        }
                                                   });
        res.status(200);
        res.json(restaurants);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = restaurantController;