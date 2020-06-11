const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const refugioSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema
});

module.exports = mongoose.model('Refugio', refugioSchema);