/*
 * resturante.js
 * Modelo de datos para las entradas de tipo resturante.
 */

const mongoose = require( 'mongoose' );

const restuaranteSchema = new mongoose.Schema({
    signatura: {type: String, required: true},
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    codigoPostal: {type: Number, required: true, min: 1},
    provincia: {type: String, required: true},
    comarca: {type: String, required: true},
    municipio: {type: String, required: true},
    capacidad: {type: Number, required: true, min: 1},
    telefono: {type: String, required: true},
    categoria: {type: Number, required: true}
});

module.exports = mongoose.model('Restaurante', restuaranteSchema);