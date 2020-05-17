const mongoose = require( 'mongoose' );

const campingSchema = new mongoose.Schema({
    comun: [alojamientoSchema] 
});

module.exports = mongoose.model('Camping', campingSchema);