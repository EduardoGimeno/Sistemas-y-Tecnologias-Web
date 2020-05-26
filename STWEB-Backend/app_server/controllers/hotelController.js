var express = require('express');
var url = require("url");
var Hotel = require('../models/hotel');
var hotelController = {};

hotelController.getHotels = async function(req, res) {
    const hotels = Hotel.find(function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'search error'});
        }
    });
    res.status(200);
    res.json(hotels);
}

hotelController.addHotel = async function(req, res) {
    var hotel = new Hotel(req.body);
    await hotel.save(function (err, newHotel) {
        if (err) {
            res.status(500);
            res.json({error: 'Hotel not saved'});
        } else {
            res.status(200);
            res.json(newHotel);
        }
    });
}

hotelController.getHotel = async function(req, res) {
    var id = req.params.id;
    const hotel = await Hotel.findById(id, function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'Hotel not found'});
        }
    });
    res.status(200);
    res.json(hotel);
}