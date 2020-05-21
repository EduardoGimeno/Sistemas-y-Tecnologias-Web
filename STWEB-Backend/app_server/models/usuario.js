const mongoose = require( 'mongoose' );

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    fechaNacimiento: {type: Date, required: true},
    email: {type: String, required: true},
    contrasena: {type: String, required: true},
    telefono: {type: String, required: true},
    pais: {type: String, required: true},
    provincia: String,
    activo: Boolean,
    baneado: Boolean,
    inicioBan: Date,
    finBan: Date
});

module.exports = mongoose.model('Usuario',usuarioSchema);