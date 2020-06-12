/*
 * alojamientoTurismoRural.js
 * Modelo de datos para las entradas de tipo alojamiento turismo rural.
 */

const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const alojamientoTurismoRuralSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema,
    espigas: {type: Number},
    tipo: {type: String}
});

module.exports = mongoose.model('AlojamientoTurismoRural', alojamientoTurismoRuralSchema);
