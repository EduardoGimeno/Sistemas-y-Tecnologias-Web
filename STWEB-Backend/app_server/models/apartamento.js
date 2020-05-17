const mongoose = require( 'mongoose' );
require('./app_server/models/alojamiento');

const apartamentoSchema = new mongoose.Schema({
    comun: [alojamientoSchema]
});

module.exports = mongoose.model('Apartamento', apartamentoSchema);