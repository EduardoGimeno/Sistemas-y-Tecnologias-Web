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
var Camping = require('../models/camping');
var Hotel = require('../models/hotel');
var TouristOffice = require('../models/oficinaTurismo');
var parserDataController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Elimina todos alojamientos de turismo rural de la base de datos,
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
            });
        });

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

/*
 * Elimina todos apartamentos de la base de datos,
 * importa el json mal estructurado de AragonOpenData, lo parsea
 * a los modelos utilizados y guarda el nuevo apartamento en la base
 * de datos
 */
parserDataController.apartamentos = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer todos
        const apartments = await Apartment.find({},function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        //Borrar todos
        apartments.forEach(async function() {
            await Apartment.deleteOne({}, function(err) {
                res.status(500);
                res.json({error: err.message});
            });
        });

        // Obtener el JSON de la fuente de datos abierta
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=66&formato=json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Adecuar los datos al modelo utilizado
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
                    // Guardar la nueva entrada
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

/*
 * Elimina todos campings de la base de datos,
 * importa el json mal estructurado de AragonOpenData, lo parsea
 * a los modelos utilizados y guarda el nuevo camping en la base
 * de datos
 */
parserDataController.camping = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer todos
        const campings = await Camping.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        //Borrar todos
        campings.forEach(async function() {
            await Camping.deleteOne({}, function(err) {
                res.status(500);
                res.json({error: err.message});
            });
        });

        // Obtener el JSON mal estructurado de la fuente de datos abiertos
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=68&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                // Adecuar los datos al modelo utilizado
                test(JSON.parse(body)).forEach(async function(item) {
                    var provincia = "Zaragoza";
                    if (item.ACTIVIDAD_PROVINCIA == "HU") {
                        provincia = "Huesca";
                    } else if (item.ACTIVIDAD_PROVINCIA == "TE") {
                        provincia = "Teruel";
                    }
                    var camping = new Camping ({
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
                    // Guardar la nueva entrada
                    await new Camping(camping).save();

                })
                res.status(200);
                res.json("Campings guardados");
            }
        })
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Elimina todos guías de la base de datos, importa el json mal 
 * estructurado de AragonOpenData, lo parsea a los modelos utilizados 
 * y guarda el nuevo guía en la base de datos
 */
parserDataController.guias = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer todos
        const guides = await Guide.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        // Borrar todos
        guides.forEach(async function() {
            await Guide.deleteOne({}, function(err) {
                res.status(500);
                res.json({error: err.message});
            });
        });

        // Obtener el JSON mal estructurado de la fuente de datos abiertos
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
        'view_id=69&formato=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Adecuar los datos al modelo utilizado
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
                // Guardar la nueva entrada
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

/*
 * Elimina todos hoteles de la base de datos, importa el json mal 
 * estructurado de AragonOpenData, lo parsea a los modelos utilizados 
 * y guarda el nuevo hotel en la base de datos
 */
parserDataController.hotel = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer todos
        const hotels = await Hotel.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        // Borrar todos
        hotels.forEach(async function() {
            await Hotel.deleteOne({}, function(err) {
                res.status(500);
                res.json({error: err.message});
            });
        });

        // Obtener el JSON mal estructurado de la fuente de datos abiertos
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=65&formato=json', function (error, response, body) {
            // Adecuar los datos al modelo utilizado
            test(JSON.parse(body)).forEach(async function(item) {
                var provincia = "Zaragoza";
                if (item.ACTIVIDAD_PROVINCIA == "HU") {
                    provincia = "Huesca";
                } else if (item.ACTIVIDAD_PROVINCIA == "TE") {
                    provincia = "Teruel";
                }
                var categoria = item.CATEGORIA_ALOJAMIENTO;
                categoria = categoria.split("e")[0];
                var hotel = new Hotel ({
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
                    grupo: item.NOMBRE_EMPRESA,
                    estrellas: categoria,
                });
                // Guardar la nueva entrada
                await new Hotel(hotel).save();
            });
            res.status(200);
            res.json("Alojamientos de turismo rural guardados");
        });
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Elimina todos oficinas turismo de la base de datos, importa el json mal 
 * estructurado de AragonOpenData, lo parsea a los modelos utilizados 
 * y guarda la nueva oficina de turismo en la base de datos
 */
parserDataController.oficinaTurismo = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer todos
        const touristsOffice = await TouristOffice.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        // Borrar todos
        touristsOffice.forEach(async function() {
            await TouristOffice.deleteOne({}, function(err) {
                if (err) {
                    res.status(500);
                    res.json({error: err.message});
                }
            });
        });

        // Obtener el JSON mal estructurado de la fuente de datos abiertos
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=70&formato=json', function (error, response, body) {
            // Adecuar los datos al modelo utilizado
            test(JSON.parse(body)).forEach(async function(item) {
                var touristOffice = {
                    signatura: item.CODIGO,
                    nombre: item.NOMBRE,
                    direccion: item.DIRECCION_ESTABLECIMIENTO,
                    provincia: item.NOMBRE_PROVINCIA,
                    municipio: item.LOCA_MUN,
                    telefono: item.TELEFONO_ESTABLECIMIENTO,
                    horario: item.OBS_HORARIO
                };
                // Guardar la nueva entrada
                await new TouristOffice(touristOffice).save();
            });
            res.status(200);
            res.json("Oficinas de turismo guardados");
        });
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Elimina todos puntos de información de la base de datos, importa el json mal 
 * estructurado de AragonOpenData, lo parsea a los modelos utilizados 
 * y guarda el nuevo punto de información en la base de datos
 */
parserDataController.puntoInformacion = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer tdos
        const informationPoints = await InformationPoint.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        // Borrar todos
        informationPoints.forEach(async function() {
            await InformationPoint.deleteOne({}, function(err) {
                if (err) {
                    res.status(500);
                    res.json({error: err.message});
                }
            });
        });

        // Obtener el JSON mal estructurado de la fuente de datos abiertos
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=71&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                // Adecuar los datos al modelo utilizado
                test(JSON.parse(body)).forEach(async function(item) {
                    var informationPoint = {
                        signatura: item.CODIGO,
                        nombre: item.NOMBRE,
                        direccion: item.DIRECCION_ESTABLECIMIENTO,
                        provincia: item.NOMBRE_PROVINCIA,
                        municipio: item.LOCA_MUN
                    };
                    // Guardar la nueva entrada
                    await new InformationPoint(informationPoint).save();
                });
                res.status(200);
                res.json("Puntos de informacion guardados");
            }
        });
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

/*
 * Elimina todos restuarantes de la base de datos, importa el json mal 
 * estructurado de AragonOpenData, lo parsea a los modelos utilizados 
 * y guarda el nuevo restuarante en la base de datos
 */
parserDataController.restaurante = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        // Extraer todos
        const restaurants = await Restaurant.find({}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });

        // Borrar todos
        restaurants.forEach(async function() {
            await Restaurant.deleteOne({}, function(err) {
                if (err) {
                    res.status(500);
                    res.json({error: err.message});
                }
            });
        });

        // Obtener el JSON mal estructurado de la fuente de datos abiertos
        request('https://opendata.aragon.es/GA_OD_Core/download?' +
            'view_id=67&formato=json', function (error, response, body) {
            console.log("HA LLEGADO");
            if (!error && response.statusCode == 200) {
                // Adecuar los datos al modelo utilizado
                test(JSON.parse(body)).forEach(async function(item) {
                    var cat = item.CATEGORIA.split(" ")[0];
                    var restaurant = {
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
                    if (restaurante.provincia == "HU") {
                        restaurante.provincia = "Huesca"
                    } else if(restaurante.provincia == "TE") {
                        restaurante.provincia = "Teruel"
                    } else { 
                        restaurante.provincia = "Zaragoza"
                    }
                    // Guardar nueva entrada
                    await new Restaurant(restaurant).save();
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

/*
 * Función utilizada para obtener un JSON bien estructurado
 * con el que poder extraer los datos más fácilmente
 */
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
