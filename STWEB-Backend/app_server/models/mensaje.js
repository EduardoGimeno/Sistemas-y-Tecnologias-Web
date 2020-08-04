/*
 * mensaje.js
 * Modelo de datos para los mensajes de los chat.
 */

const mongoose = require( 'mongoose' );

const mensajeSchema = new mongoose.Schema({
    emisor: String,
    texto: String,
    hora: Date
});

const mensajeModel = mongoose.model('Mensaje', mensajeSchema);

module.exports = {mensajeModel, mensajeSchema};