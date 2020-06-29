/*
 * usuario.js
 * Modelo de datos para los usuarios.
 */

const mongoose = require( 'mongoose' );

const usuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    fechaNacimiento: Date,
    contrasena: String,
    telefono: String,
    pais: String,
    provincia: String,
    activo: Boolean,
    baneado: Boolean,
    inicioBan: Date,
    finBan: Date,
    admin: Boolean
});

module.exports = mongoose.model('Usuario',usuarioSchema);