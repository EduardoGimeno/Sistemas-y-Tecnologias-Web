const mongoose = require( 'mongoose' );

const alojamientoSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    codigoPostal: {type: Number, required: true, min: 1},
    provincia: {type: String, required: true},
    comarca: {type: String, required: true},
    municipio: {type: String, required: true},
    capacidad: {type: Number, required: true, min: 1},
    email: {type: String, required: true},
    telefono: {type: String, required: true}
});
const alojamientoModel=mongoose.model('Alojamiento', alojamientoSchema);

module.exports = {alojamientoModel,alojamientoSchema};