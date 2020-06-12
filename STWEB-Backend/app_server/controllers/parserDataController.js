/*
 * parserDataController.js
 * Las operaciones de este módulo se encargan de la gestión de los
 * datos de la aplicación, actualizándolos y guardándolos.
 * Hay una operación para cada tipo de entidad que se extrae de la
 * fuente de datos abiertos.
 */

var express = require('express');
var url = require('url');
var request = require('request');
var Guide = require('../models/guia');
var Apartment = require('../models/apartamento');
var InformationPoint = require('../models/puntoInformacion');
var Restaurant = require('../models/restaurante');
var RuralHouse = require('../models/alojamientoTurismoRural');
var parserDataController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Elimina todas alojamientos de turismo rural de la base de datos,
 * importa el json mal estructurado de AragonOpenData, lo parsea
 * a los modelos utilizados y guarda el nuevo alojamiento en la base
 * de datos
 */
parserDataController.alojamientosTurismoRural = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer todos
        const ruralHouses = await RuralHouse.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        // Borrar todos
        ruralHouses.forEach(async function() {
            await RuralHouse.deleteOne({}, function(err) {
                if (err) {
                    res.status(500);
                    res.json({error: err.message});
                }
            })
        })
        // Obtener el JSON de la fuente de datos abierta
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=73&formato=json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Adecuar los datos al modelo utilizado
                test(JSON.parse(body)).forEach(async function(item) {
                    var provincia = "Zaragoza";
                    if (item.ACTIVIDAD_PROVINCIA == "HU") {
                        provincia = "Huesca";
                    } else if (item.ACTIVIDAD_PROVINCIA == "TE") {
                        provincia = "Teruel";
                    }
                    var categoria = item.CATEGORIA_VIVIENDA;
                    categoria = categoria.split(" ")[0];
                    var ruralHouse = new RuralHouse ({
                        comun: {
                            signatura: item.SIGNATURA,
                            nombre: item.NOMBRE_DE_LA_VIVIENDA,
                            direccion: item.DIRECCION_ESTABLECIMIENTO,
                            codigoPostal: item.CODIGO_POSTAL_ESTABLECIMIENTO,
                            provincia: provincia,
                            comarca: item.NOMBRE_COMARCA,
                            municipio: item.LOCALIDAD_ESTABLECIMIENTO,
                            capacidad: item.NUMERO_TOTAL_PLAZAS,
                            email: "entradaexample@gmail.com",
                            telefono: item.TELEFONO_ESTABLECIMIENTO
                        },
                        espigas: categoria,
                        tipo: item.TIPO_VIVIENDA
                    });
                    // Guardar la nueva entrada
                    await new RuralHouse(ruralHouse).save();
                });
                res.status(200);
                res.json("Alojamientos de turismo rural guardados");
            }
        });
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

parserDataController.apartamentos = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        const apartments = await Apartment.find();
        apartments.forEach(async function() {
            await Apartment.deleteOne({});
        });
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
                    await new Apartment(apartamento).save();

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
        const guides = await Guide.find();
        guides.forEach(async function() {
            await Guide.deleteOne({});
        });
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
        //Se extraen todos los datos almacenados actualmente en la bd
        const informationPoints = await InformationPoint.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        // Se borran todos los datos actuales
        informationPoints.forEach(async function() {
            await InformationPoint.deleteOne({}, function(err) {
                if (err) {
                    res.status(500);
                    res.json({error: err.message});
                }
            })
        })
        //Descargamos los datos actualizados
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=71&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //Adecuamos los datos a nuestro modelo
                test(JSON.parse(body)).forEach(async function(item) {
                    var puntoinformacion = {
                        signatura: item.CODIGO,
                        nombre: item.NOMBRE,
                        direccion: item.DIRECCION_ESTABLECIMIENTO,
                        provincia: item.NOMBRE_PROVINCIA,
                        municipio: item.LOCA_MUN
                    };
                    //Guardamos el nuevo dato
                    await new InformationPoint(puntoinformacion).save();
                })
                res.status(200);
                res.json("Puntos de informacion guardados");
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
        //Se extraen todos los datos almacenados actualmente en la bd
        const restaurants = await Restaurant.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        // Se borran todos los datos actuales
        restaurants.forEach(async function() {
            await Restaurant.deleteOne({}, function(err) {
                if (err) {
                    res.status(500);
                    res.json({error: err.message});
                }
            })
        })
        //Descargamos los datos actualizados
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=67&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                //Adecuamos los datos a nuestro modelo
                test(JSON.parse(body)).forEach(async function(item) {
                    var cat= item.CATEGORIA.split(" ")[0];
                    var restaurante = {
                        signatura: item.SIGNATURA,
                        nombre: item.NOMBRE_ESTABLECIMIENTO,
                        direccion: item.DIRECCION_ESTABLECIMIENTO,
                        codigoPostal: item.CODIGO_POSTAL_ESTABLECIMIENTO,
                        provincia: item.ACTIVIDAD_PROVINCIA,
                        comarca: item.NOMBRE_COMARCA,
                        municipio: item.LOCALIDAD_ESTABLECIMIENTO,
                        capacidad: item.NUMERO_PLAZAS,
                        telefono: item.TELEFONO_ESTABLECIMIENTO,
                        categoria: cat
                    };
                    if(restaurante.provincia == "HU"){restaurante.provincia = "Huesca"}
                    else if(restaurante.provincia == "TE"){restaurante.provincia = "Teruel"}
                    else{restaurante.provincia = "Zaragoza"}
                    restaurante.categoria= restaurante.categoria.split(" ")[0];
                    //Guardamos el nuevo dato
                    await new Restaurant(restaurante).save();
                })
                res.status(200);
                res.json("Restaurantes guardados");
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
