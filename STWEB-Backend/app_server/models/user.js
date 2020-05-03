const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birthDate: {type: Date, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    telephone: {type: String, required: true},
    country: {type: String, required: true},
    province: String,
    active: true,
    banned: false
});