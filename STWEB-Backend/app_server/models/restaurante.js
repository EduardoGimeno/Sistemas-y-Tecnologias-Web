/*
 * resturante.js
 * Modelo de datos para las entradas de tipo resturante.
 */

const mongoose = require( 'mongoose' );

const restuaranteSchema = new mongoose.Schema({
    signatura: {type: String},
    nombre: {type: String},
    direccion: {type: String},
    codigoPostal: {type: Number},
    provincia: {type: String},
    comarca: {type: String},
    municipio: {type: String},
    capacidad: {type: Number},
    telefono: {type: String},
    categoria: {type: Number}
});

module.exports = mongoose.model('Restaurante', restuaranteSchema);
