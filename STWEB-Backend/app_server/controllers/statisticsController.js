/*
 * statisticsController.js
 * Controlador de las operaciones de las estadísticas.
 */

var express = require('express');
var url = require('url');
var Statistic = require('../models/estadistica');
var Data = require('../models/dato');
var Hotel = require('../models/hotel');
var statisticsController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener la cantidad de hoteles por municipio.
 */
statisticsController.hotelsPerMunicipality = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        const hotels = await Hotel.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        var i;
        var munArray = [];
        var countArray = [];
        for (i = 0; i < hotels.length; i++) {
            var index = munArray.indexOf(hotels[i].comun.municipio);
            if (index == -1) {
                munArray.push(hotels[i].comun.municipio);
                countArray.push(1);
            } else {
                countArray[index] += 1;
            }
        }

        var j;
        var dataArray = [];
        for (j = 0; j < munArray.length; j++) {
            var entry = new Data.datoModel({ nombre: munArray[j], valor: countArray[j]});
            dataArray.push(entry);
        }

        var statistic = new Statistic({ nombre: 'Numero hoteles por municipio', datos: dataArray});
        await statistic.save(function(err, newStatistic) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(newStatistic);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = statisticsController;