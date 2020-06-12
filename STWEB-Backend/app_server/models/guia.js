/*
 * guia.js
 * Modelo de datos para las entradas de tipo guía.
 */

const mongoose = require( 'mongoose' );

const guiaSchema = new mongoose.Schema({
    signatura: {type: String},
    nombre: {type: String},
    apellidos: {type: String},
    telefono: {type: String},
    espanol: {type: Boolean},
    ingles: {type: Boolean},
    frances: {type: Boolean},
    aleman: {type: Boolean},
    italiano: {type: Boolean},
    otros: {type: Boolean}
});

module.exports = mongoose.model('Guia', guiaSchema);
