var express = require('express');
var url = require('url');
var request = require('request');
var Guide = require('../models/guia');
var Apartment = require('../models/apartamento');
var Puntoinformacion = require('../models/puntoInformacion');
var parserDataController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

parserDataController.alojamientoTurismoRural = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //alojamientoTurismoRural
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=73&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.apartamentos = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=66&formato=json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                test(JSON.parse(body)).forEach(async function(item) {
                    var provincia = "Zaragoza";
                    if (item.ACTIVIDAD_PROVINCIA == "HU") {
                        provincia = "Huesca";
                    } else if (item.ACTIVIDAD_PROVINCIA == "TE") {
                        provincia = "Teruel";
                    }
                    var apartamento = new Apartment ({
                        comun: {
                            signatura: item.SIGNATURA,
                            nombre: item.NOMBRE_ESTABLECIMIENTO,
                            direccion: item.DIRECCION_ESTABLECIMIENTO,
                            codigoPostal: item.CODIGO_POSTAL_ESTABLECIMIENTO,
                            provincia: provincia,
                            comarca: item.NOMBRE_COMARCA,
                            municipio: item.LOCALIDAD_ESTABLECIMIENTO,
                            capacidad: item.NUMERO_PLAZAS,
                            email: "entradaexample@gmail.com",
                            telefono: item.TELEFONO_ESTABLECIMIENTO
                        }
                    });
                    var filter = {comun:{signatura: item.SIGNATURA}};
                    await Apartment.findOneAndUpdate(filter, apartamento, {new: true, upsert: true});

                })
                res.status(200);
                res.json("Apartamentos guardados");
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.camping = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //camping
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=68&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.guias = async function(req, res) {
    try {
    //checkToken(req.headers.authentication);
    request('https://opendata.aragon.es/GA_OD_Core/download?' +
        'view_id=69&formato=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            test(JSON.parse(body)).forEach(async function(item) {
                var guia = {
                    signatura: item.SIGNATURA,
                    nombre: item.NOMBRE_GUIA,
                    apellidos: item.APELLIDO_GUIA,
                    telefono: item.TELEFONO_TITULAR,
                    espanol: item.ESPANOL==null ? 0:1,
                    ingles: item.INGLES==null ? 0:1,
                    frances: item.FRANCES==null ? 0:1,
                    aleman: item.ALEMAN==null ? 0:1,
                    italiano: item.ITALIANO==null ? 0:1,
                    otros: item.OTROS_IDIOMAS==null ? 0:1
                }
                await new Guide(guia).save();
            })
            res.status(200);
            res.json("Guias guardados");
        }
    })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.hotel = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //hotel
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=65&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.oficinaTurismo = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //oficinaTurismo
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=70&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.puntoInformacion = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //puntoInformacion
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=71&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                test(JSON.parse(body)).forEach(async function(item) {
                    var puntoinformacion = {
                        signatura: item.CODIGO,
                        nombre: item.NOMBRE,
                        direccion: item.DIRECCION_ESTABLECIMIENTO,
                        provincia: item.NOMBRE_PROVINCIA,
                        municipio: item.LOCA_MUN
                    };
                    await new Puntoinformacion(puntoinformacion).save();
                })
                res.status(200);
                res.json("result");
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.refugio = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //refugio
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=64&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}
parserDataController.restaurante = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        //restaurante
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=67&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //importedJSON = body;
                //console.log(body);
                importedJSON = JSON.parse(body);
            }
        })

    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

test = function(datos) {
    let ejemplo = datos;
    let claves = ejemplo[0];

    let retVal = [];

    ejemplo.shift();

    ejemplo.forEach(function(item, index) {
        let aux = {};
        claves.forEach(function(jsonitem, jsonindex) {
            aux[jsonitem] = item[jsonindex];
        });
        retVal.push(aux);
    });
    return retVal;
}
module.exports = parserDataController;
