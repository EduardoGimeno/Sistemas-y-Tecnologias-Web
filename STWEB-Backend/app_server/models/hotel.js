/*
 * hotel.js
 * Modelo de datos para las entradas de tipo hotel.
 */

const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const hotelSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema,
    grupo: String,
    estrellas: Number
});

module.exports = mongoose.model('Hotel', hotelSchema);
