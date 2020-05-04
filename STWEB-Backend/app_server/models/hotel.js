const mongoose = require( 'mongoose' );
require('./app_server/models/accommodation');

const hotelSchema = new mongoose.Schema({
    common: [accommodationSchema],
    group: String,
    stars: {type: Number, required: true, min: 1, max: 5}
});

module.exports = mongoose.model('Hotels', hotelSchema);