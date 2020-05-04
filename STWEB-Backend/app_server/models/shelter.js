const mongoose = require( 'mongoose' );
require('./app_server/models/accommodation');

const shelterSchema = new mongoose.Schema({
    common: [accommodationSchema]
});

module.exports = mongoose.model('Shelters', shelterSchema);