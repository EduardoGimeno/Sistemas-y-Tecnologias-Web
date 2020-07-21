/*
 * resturante.js
 * Modelo de datos para las entradas de tipo resturante.
 */

const mongoose = require( 'mongoose' );

const restuaranteSchema = new mongoose.Schema({
    signatura: String,
    nombre: String,
    direccion: String,
    codigoPostal: Number,
    provincia: String,
    comarca: String,
    municipio: String,
    capacidad: Number,
    telefono: String,
    categoria: Number
});

module.exports = mongoose.model('Restaurante', restuaranteSchema);
