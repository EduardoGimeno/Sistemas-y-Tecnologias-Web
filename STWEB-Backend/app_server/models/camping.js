/*
 * camping.js
 * Modelo de datos para las entradas de tipo camping.
 */

const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const campingSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema
});

module.exports = mongoose.model('Camping', campingSchema);