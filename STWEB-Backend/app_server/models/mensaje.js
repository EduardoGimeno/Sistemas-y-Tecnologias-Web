const mongoose = require( 'mongoose' );

const mensajeSchema = new mongoose.Schema({
    emisor: {type: String, required: true},
    texto: {type: String, required: true},
    hora: {type: Date, required: true}
});

const mensajeModel = mongoose.model('Mensaje', mensajeSchema);

module.exports = {mensajeModel, mensajeSchema};