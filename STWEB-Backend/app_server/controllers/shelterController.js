var express = require('express');
var url = require("url");
var Shelter = require('../models/refugio');
var shelterController = {};

shelterController.getShelters = async function(req, res) {
    const shelter = await Shelter.find(function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'search error'});
        }
    });
    res.json(shelter);
}

shelterController.addShelter = async function(req, res){
    var shelter = new Shelter(req.body);
    await shelter.save(function (err, newShelter) {
        if (err) {
            res.status(500);
            res.json({error: 'Shelter not created'});
        } else {
            res.status(200);
            res.json(newShelter);
        }
    });
}

shelterController.getShelter = async function(req, res) {
    var id = req.params.id;
    const shelter = await Shelter.findById(id, function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'Shelter not found'});
        }
    });
    res.status(200);
    res.json(shelter);
}

shelterController.searchShelters = async function(req, res) {
    var queryData = url.parse(req.url, true).query;
    var province = queryData.province;
    var region = queryData.region;
    var municipality = queryData.municipality;

    if (province === "null") {
        province = '^[a-z].*';
    } else if (region === "null") {
        region = '^[a-z].*';
    } else if (municipality === "null") {
        municipality = '^[a-z].*';
    }

    const shelters = await Shelter.find({provincia: new RegExp(province,'i'), 
                                   region: new RegExp(region, 'i'), 
                                   municipio: new RegExp(municipality, 'i')},
                                   function(err) {
                                       if (err) {
                                            res.status(400);
                                            res.json({error: 'search error'}); 
                                       }
                                   });
    res.status(200);
    res.json(shelters);
}

module.exports = shelterController;