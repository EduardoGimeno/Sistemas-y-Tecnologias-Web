/*
 * statisticsController.js
 * Controlador de las operaciones de las estadísticas.
 */

var express = require('express');
var jwtinterface = require('../jsonwebtoken');
var Statistic = require('../models/estadistica');
var Data = require('../models/dato');
var Hotel = require('../models/hotel');
var RuralHouse = require('../models/alojamientoTurismoRural');
var Apartment = require('../models/apartamento');
var Camping = require('../models/camping');
var TouristOffice = require('../models/oficinaTurismo');
var InformationPoint = require('../models/puntoInformacion');
var Shelter = require('../models/refugio');
var Guide = require('../models/guia');
var Restaurant = require('../models/restaurante');
var User = require('../models/usuario');
var Chat = require('../models/chat');
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

/*
 * Obtener las provincias de procedencia de los usuarios.
 */
statisticsController.usersPerProvince = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        const users = await User.find({ admin: false, activo: true }, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        var i;
        var provArray = [];
        var countArray = [];
        for (i = 0; i < users.length; i++) {
            var index = provArray.indexOf(users[i].provincia);
            if (index == -1) {
                provArray.push(users[i].provincia);
                countArray.push(1);
            } else {
                countArray[index] += 1;
            }
        }

        var j;
        var dataArray = [];
        for (j = 0; j < provArray.length; j++) {
            var entry = new Data.datoModel({ nombre: provArray[j], valor: countArray[j]});
            dataArray.push(entry);
        }

        var statistic = new Statistic({ nombre: 'Distribucion de los usuarios por provincias', datos: dataArray});
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
 * Obtener la distribución, en porcenatajes, de las entradas
 * guardadas en la aplicación.
 */
statisticsController.entriesPercentage = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        const hotels = await Hotel.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const ruralHouses = await RuralHouse.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const apartments = await Apartment.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const campings = await Camping.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const touristOffices = await TouristOffice.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const informationPoints = await InformationPoint.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const shelters = await Shelter.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const restaurants = await Restaurant.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        const guides = await Guide.count(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        var total = hotels + ruralHouses + apartments + campings + touristOffices + informationPoints
            + shelters + restaurants + guides;

        var dataArray = [];
        var hotelsPer = (hotels / total) * 100;
        hotelsPer = hotelsPer.toFixed(2);
        var entry = new Data.datoModel({ nombre: 'hoteles', valor: hotelsPer});
        dataArray.push(entry);
        var ruralHousesPer = (ruralHouses / total) * 100;
        ruralHousesPer = ruralHousesPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'casas rurales', valor: ruralHousesPer});
        dataArray.push(entry);
        var apartmentsPer = (apartments / total) * 100;
        apartmentsPer = apartmentsPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'apartamentos', valor: apartmentsPer});
        dataArray.push(entry);
        var campingsPer = (campings / total) * 100;
        campingsPer = campingsPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'campings', valor: campingsPer});
        dataArray.push(entry);
        var touristOfficesPer = (touristOffices / total) * 100;
        touristOfficesPer = touristOfficesPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'oficinas turismo', valor: touristOfficesPer});
        dataArray.push(entry);
        var informationPointsPer = (informationPoints / total) * 100;
        informationPointsPer = informationPointsPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'puntos informacion', valor: informationPointsPer});
        dataArray.push(entry);
        var sheltersPer = (shelters / total) * 100;
        sheltersPer = sheltersPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'refugios', valor: sheltersPer});
        dataArray.push(entry);
        var restaurantsPer = (restaurants / total) * 100;
        restaurantsPer = restaurantsPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'restaurantes', valor: restaurantsPer});
        dataArray.push(entry);
        var guidesPer = (guides / total) * 100;
        guidesPer = guidesPer.toFixed(2);
        entry = new Data.datoModel({ nombre: 'guias', valor: guidesPer});
        dataArray.push(entry);

        var statistic = new Statistic({ nombre: 'Porcentaje entradas', datos: dataArray});
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
 * Obtener la cantidad de chats por hotel.
 */
statisticsController.chatsPerHotel = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        const chats = await Chat.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        var i;
        var hotelArray = [];
        var countArray = [];
        for (i = 0; i < chats.length; i++) {
            var index = hotelArray.indexOf(chats[i].nomEntrada);
            if (index == -1) {
                hotelArray.push(chats[i].nomEntrada);
                countArray.push(1);
            } else {
                countArray[index] += 1;
            }
        }

        var j;
        var dataArray = [];
        for (j = 0; j < hotelArray.length; j++) {
            var entry = new Data.datoModel({ nombre: hotelArray[j], valor: countArray[j]});
            dataArray.push(entry);
        }

        var statistic = new Statistic({ nombre: 'Numero de chats por hotel', datos: dataArray});
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
 * Obtener las fechas en las que usuarios baneados pueden
 * recuperar su cuenta.
 */
statisticsController.datesEndBan = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        const users = await User.find({ admin: false, baneado: true, activo: true }, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        var i;
        var dateArray = [];
        var countArray = [];
        for (i = 0; i < users.length; i++) {
            var index = dateArray.indexOf(users[i].finBan.toString());
            if (index == -1) {
                dateArray.push(users[i].finBan.toString());
                countArray.push(1);
            } else {
                countArray[index] += 1;
            }
        }

        var j;
        var dataArray = [];
        for (j = 0; j < dateArray.length; j++) {
            var entry = new Data.datoModel({ nombre: dateArray[j], valor: countArray[j]});
            dataArray.push(entry);
        }

        var statistic = new Statistic({ nombre: 'Numero de usuarios que recuperan su cuenta en cada fecha', datos: dataArray});
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