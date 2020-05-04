const mongoose = require( 'mongoose' );
require('./app_server/models/accommodation');

const apartmentSchema = new mongoose.Schema({
    common: [accommodationSchema],
});

module.exports = mongoose.model('Apartments', apartmentSchema);