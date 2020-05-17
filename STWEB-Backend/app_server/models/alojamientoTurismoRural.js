const mongoose = require( 'mongoose' );
require('./app_server/models/alojamiento');

const alojamientoTurismoRuralSchema = new mongoose.Schema({
    comun: [alojamientoSchema],
    espigas: {type: Number, required: true, min: 1, max: 5},
    tipo: {type: String, required: true}
});

module.exports = mongoose.model('AlojamientoTurismoRural', alojamientoTurismoRuralSchema);