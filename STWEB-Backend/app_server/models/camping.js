const mongoose = require( 'mongoose' );
var alojamiento = require('./alojamiento');

const campingSchema = new mongoose.Schema({
    comun: alojamiento.alojamientoSchema
});

module.exports = mongoose.model('Camping', campingSchema);