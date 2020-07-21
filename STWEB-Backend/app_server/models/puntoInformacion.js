/*
 * puntoInformacion.js
 * Modelo de datos para las entradas de tipo punto de información.
 */

const mongoose = require( 'mongoose' );

const puntoInformacionSchema = new mongoose.Schema({
    signatura: String,
    nombre: String,
    direccion: String,
    provincia: String,
    municipio: String
});

module.exports = mongoose.model('PuntoInformacion', puntoInformacionSchema);
