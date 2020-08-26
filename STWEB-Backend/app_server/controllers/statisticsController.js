/*
 * statisticsController.js
 * Controlador de las operaciones de las estadísticas.
 */

var express = require('express');
var jwtinterface = require('../jsonwebtoken');
var Statistic = require('../models/estadistica');
var Data = require('../models/dato');
var Hotel = require('../models/hotel');
var Guide = require('../models/guia');
var Restaurant = require('../models/restaurante');
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

/*
 * Obtener la distribución, en porcenatajes, de los idiomas hablados
 * por los guías.
 */
statisticsController.guidesIdiomPercentage = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        const guides = await Guide.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        var english = 0, french = 0, german = 0, italian = 0, spanish = 0;
        var i;
        for (i = 0; i < guides.length; i++) {
            if (guides[i].espanol == 'true') {
                spanish += 1;
            }
            if (guides[i].ingles == 'true') {
                english += 1;
            }
            if (guides[i].frances == 'true') {
                french += 1;
            }
            if (guides[i].aleman == 'true') {
                german += 1;
            }
            if (guides[i].italiano == 'true') {
                italian += 1;
            }
        }

        var dataArray = [];
        var spanishPer = (spanish / guides.length) * 100;
        spanishPer = spanishPer.toFixed(2);
        var entry = new Data.datoModel({ nombre: 'espanol', valor: spanishPer});
        dataArray.push(entry);
        var englishPer = (english / guides.length) * 100;
        englishPer = englishPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'ingles', valor: englishPer});
        dataArray.push(entry);
        var frenchPer = (french / guides.length) * 100;
        frenchPer = frenchPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'frances', valor: frenchPer});
        dataArray.push(entry);
        var germanPer = (german / guides.length) * 100;
        germanPer = germanPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'aleman', valor: germanPer});
        dataArray.push(entry);
        var italianPer = (italian / guides.length) * 100;
        italianPer = italianPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'italiano', valor: italianPer});
        dataArray.push(entry);

        var statistic = new Statistic({ nombre: 'Porcentaje idiomas guias', datos: dataArray});
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

/*
 * Obtener la cantidad de restuarantes de 3 tenedores/tazas por
 * comarca.
 */
statisticsController.restaurantsCategoryPerRegion = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        const restuarants = await Restaurant.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        var i;
        var regArray = [];
        var countArray = [];
        for (i = 0; i < restuarants.length; i++) {
            var index = regArray.indexOf(restuarants[i].comarca);
            if (restuarants[i].categoria == 3) {
                if (index == -1) {
                    regArray.push(restuarants[i].comarca);
                    countArray.push(1);
                } else {
                    countArray[index] += 1;
                }
            }
        }

        var j;
        var dataArray = [];
        for (j = 0; j < regArray.length; j++) {
            var entry = new Data.datoModel({ nombre: regArray[j], valor: countArray[j]});
            dataArray.push(entry);
        }

        var statistic = new Statistic({ nombre: 'Numero de restuarantes de categoria 3 por comarca', datos: dataArray});
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