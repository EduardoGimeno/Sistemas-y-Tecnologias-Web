const mongoose = require( 'mongoose' );

const puntoInformacionSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    provincia: {type: String, required: true},
    municipio: {type: String, required: true}
});

module.exports = mongoose.model('PuntoInformacion', puntoInformacionSchema);