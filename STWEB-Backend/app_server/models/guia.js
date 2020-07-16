/*
 * guia.js
 * Modelo de datos para las entradas de tipo guía.
 */

const mongoose = require( 'mongoose' );

const guiaSchema = new mongoose.Schema({
    signatura: String,
    nombre: String,
    apellidos: String,
    telefono: String,
    espanol: String,
    ingles: String,
    frances: String,
    aleman: String,
    italiano: String,
    otros: String
});

module.exports = mongoose.model('Guia', guiaSchema);
