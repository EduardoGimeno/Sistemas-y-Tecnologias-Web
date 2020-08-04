/*
 * chat.js
 * Modelo de datos para los chat.
 */

const mongoose = require( 'mongoose' );
var mensaje = require('./mensaje');

const chatSchema = new mongoose.Schema({
    nomEntrada: String,
    nomUsuario: String,
    emailEntrada: String,
    emailUsuario: String,
    mensajes: [mensaje.mensajeSchema]
});

module.exports = mongoose.model('Chat', chatSchema);