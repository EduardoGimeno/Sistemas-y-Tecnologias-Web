/*
 * estadistica.js
 * Modelo de datos para las estadísticas.
 */

const mongoose = require( 'mongoose' );
var dato = require('./dato');

const estadisticaSchema = new mongoose.Schema({
    nombre: String,
    datos: [dato.datoSchema]
});

module.exports = mongoose.model('Estadistica', estadisticaSchema);