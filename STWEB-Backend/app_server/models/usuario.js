const mongoose = require( 'mongoose' );

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    fechaNacimiento: {type: Date},
    contrasena: {type: String},
    telefono: {type: String},
    pais: {type: String},
    provincia: String,
    activo: Boolean,
    baneado: Boolean,
    inicioBan: Date,
    finBan: Date
});

module.exports = mongoose.model('Usuario',usuarioSchema);