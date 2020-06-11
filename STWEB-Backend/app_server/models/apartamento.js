const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const apartamentoSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema
});

module.exports = mongoose.model('Apartamento', apartamentoSchema);