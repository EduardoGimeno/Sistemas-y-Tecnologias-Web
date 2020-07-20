/*
 * oficinaTurismo.js
 * Modelo de datos para las entradas de tipo oficina de turismo.
 */

const mongoose = require( 'mongoose' );

const oficinaTurismoSchema = new mongoose.Schema({
    signatura: String,
    nombre: String,
    direccion: String,
    provincia: String,
    municipio: String,
    telefono: String,
    horario: String
});

module.exports = mongoose.model('OficinaTurismo', oficinaTurismoSchema);
