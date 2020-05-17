const mongoose = require( 'mongoose' );
require('./app_server/models/alojamiento');

const hotelSchema = new mongoose.Schema({
    comun: [alojamientoSchema],
    grupo: String,
    estrellas: {type: Number, required: true, min: 1, max: 5}
});

module.exports = mongoose.model('Hotel', hotelSchema);