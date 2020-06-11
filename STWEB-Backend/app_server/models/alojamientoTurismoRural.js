const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const alojamientoTurismoRuralSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema,
    espigas: {type: Number, required: true, min: 1, max: 5},
    tipo: {type: String, required: true}
});

module.exports = mongoose.model('AlojamientoTurismoRural', alojamientoTurismoRuralSchema);