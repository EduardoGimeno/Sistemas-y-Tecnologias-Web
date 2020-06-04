const mongoose = require( 'mongoose' );
var alojamiento=require('./alojamiento');

const hotelSchema = new mongoose.Schema({
    comun: [alojamiento.alojamientoSchema],
    grupo: String,
    estrellas: {type: Number, required: true, min: 1, max: 5}
});

module.exports = mongoose.model('Hotel', hotelSchema);