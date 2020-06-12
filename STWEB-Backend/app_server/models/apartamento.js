/*
 * apartamento.js
 * Modelo de datos para el tipo de entrada apartamento.
 */

const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const apartamentoSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema
});

module.exports = mongoose.model('Apartamento', apartamentoSchema);