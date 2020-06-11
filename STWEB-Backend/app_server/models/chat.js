const mongoose = require( 'mongoose' );
var mensaje = require('./mensaje');

const chatSchema = new mongoose.Schema({
    nomEntrada: {type: String, required: true},
    nomUsuario: {type: String, required: true},
    emailEntrada: {type: String, required: true},
    emailUsuario: {type: String, required: true},
    mensajes: [mensaje.mensajeSchema]
});

module.exports = mongoose.model('Chat', chatSchema);