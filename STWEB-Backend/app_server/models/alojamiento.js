/*
 * alojamiento.js
 * Modelo de datos común para las entradas de tipo alojamiento.
 */

const mongoose = require( 'mongoose' );

const alojamientoSchema = new mongoose.Schema({
    signatura: {type: String},
    nombre: {type: String},
    direccion: {type: String},
    codigoPostal: {type: Number},
    provincia: {type: String},
    comarca: {type: String},
    municipio: {type: String},
    capacidad: {type: Number},
    email: {type: String},
    telefono: {type: String}
});

const alojamientoModel = mongoose.model('Alojamiento', alojamientoSchema);

module.exports = {alojamientoModel, alojamientoSchema};
