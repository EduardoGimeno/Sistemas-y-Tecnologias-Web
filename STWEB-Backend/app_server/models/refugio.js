/*
 * refugio.js
 * Modelo de datos para las entradas de tipo refugio.
 */

const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const refugioSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema
});

module.exports = mongoose.model('Refugio', refugioSchema);