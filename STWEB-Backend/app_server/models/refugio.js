const mongoose = require( 'mongoose' );
require('./app_server/models/alojamiento');

const refugioSchema = new mongoose.Schema({
    comun: [alojamientoSchema]
});

module.exports = mongoose.model('Refugio', refugioSchema);