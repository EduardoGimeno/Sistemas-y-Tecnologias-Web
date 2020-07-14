/*
 * alojamiento.js
 * Modelo de datos común para las entradas de tipo alojamiento.
 */

const mongoose = require( 'mongoose' );

const alojamientoSchema = new mongoose.Schema({
    signatura: String,
    nombre: String,
    direccion: String,
    codigoPostal: Number,
    provincia: String,
    comarca: String,
    municipio: String,
    capacidad: Number,
    email: String,
    telefono: String
});

const alojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);

module.exports = {alojamientoModel, alojamientoSchema};
