const mongoose = require( 'mongoose' );
require('./app_server/models/accommodation');

const ruralAccommodationSchema = new mongoose.Schema({
    common: [accommodationSchema],
    spikes: {type: Number, required: true, min: 1, max: 5},
    type: {type: String, required: true}
});

module.exports = mongoose.model('RuralAccommodations', ruralAccommodationSchema);