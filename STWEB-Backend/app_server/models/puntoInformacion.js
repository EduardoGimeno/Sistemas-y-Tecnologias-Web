/*
 * puntoInformacion.js
 * Modelo de datos para las entradas de tipo punto de información.
 */

const mongoose = require( 'mongoose' );

const puntoInformacionSchema = new mongoose.Schema({
    signatura: {type: String},
    nombre: {type: String},
    direccion: {type: String},
    provincia: {type: String},
    municipio: {type: String}
});

module.exports = mongoose.model('PuntoInformacion', puntoInformacionSchema);
