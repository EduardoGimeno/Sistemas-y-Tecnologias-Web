/*
 * puntoInformacion.js
 * Modelo de datos para las entradas de tipo punto de información.
 */

const mongoose = require( 'mongoose' );

const puntoInformacionSchema = new mongoose.Schema({
    signatura: {type: String, required: true},
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    provincia: {type: String, required: true},
    municipio: {type: String, required: true}
});

module.exports = mongoose.model('PuntoInformacion', puntoInformacionSchema);