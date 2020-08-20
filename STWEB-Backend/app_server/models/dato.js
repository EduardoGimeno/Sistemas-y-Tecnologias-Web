/*
 * dato.js
 * Modelo de datos para los datos de las estadísticas.
 */

const mongoose = require( 'mongoose' );

const datoSchema = new mongoose.Schema({
    nombre: String,
    valor: Number,
});

const datoModel = mongoose.model('Dato', datoSchema);

module.exports = {datoModel, datoSchema};