const mongoose = require( 'mongoose' );

const accommodationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    group: String,
    address: {type: String, required: true},
    postalCode: {type: Number, required: true, min: 1},
    province: {type: String, required: true},
    region: {type: String, required: true},
    municipality: {type: String, required: true},
    stars: {type: Number, required: true, min: 1, max: 5},
    capacity: {type: Number, required: true, min: 1},
    email: {type: String, required: true},
    telephone: {type: String, required: true}
});

module.exports = mongoose.model('Accommodations', accommodationSchema);