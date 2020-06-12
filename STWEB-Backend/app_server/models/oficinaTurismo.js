/*
 * oficinaTurismo.js
 * Modelo de datos para las entradas de tipo oficina de turismo.
 */

const mongoose = require( 'mongoose' );

const oficinaTurismoSchema = new mongoose.Schema({
    signatura: {type: String},
    nombre: {type: String},
    direccion: {type: String},
    provincia: {type: String},
    municipio: {type: String},
    telefono: {type: String},
    horario: {type: String}
});

module.exports = mongoose.model('OficinaTurismo', oficinaTurismoSchema);
