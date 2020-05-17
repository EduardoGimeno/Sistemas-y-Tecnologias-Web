const mongoose = require( 'mongoose' );

const oficinaTurismoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    provincia: {type: String, required: true},
    telefono: {type: String, required: true},
    horario: {type: String, required: true}
});

module.exports = mongoose.model('OficinaTurismo', oficinaTurismoSchema);