/*
 * db.js
 * Configuración de la conexión a la base de datos.
 */

const mongoose = require('mongoose');
 
// Defined a database connection string

// Despliegue
//const dbURI = process.env.DB_URI;

// Desarrollo
const dbURI = "mongodb://heroku_nlz612k6:4esr5nd00lhq9oahddep17pj1b@ds161520.mlab.com:61520/heroku_nlz612k6";

//const dbURI = "mongodb://heroku_5299hwsl:bfhfe1bp4mq61l37uh8mi34knq@ds121299.mlab.com:21299/heroku_5299hwsl";

// Opened a Mongoose connection at application startup
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Monitored the Mongoose connection events
 mongoose.connection.on('connected', () => {
   console.log(`Mongoose connected to ${dbURI}`);
 });
 mongoose.connection.on('error', err => {
   console.log('Mongoose connection error:', err);
 });
 mongoose.connection.on('disconnected', () => {
   console.log('Mongoose disconnected');
 });

// Monitored some Node process events so that we can close the Mongoose connection when the application ends
 const gracefulShutdown = (msg, callback) => {
   mongoose.connection.close( () => {
     console.log(`Mongoose disconnected through ${msg}`);
     callback();
   });
 };

 // For nodemon restarts
 process.once('SIGUSR2', () => {
   gracefulShutdown('nodemon restart', () => {
     process.kill(process.pid, 'SIGUSR2');
   });
 });

 // For app termination
 process.on('SIGINT', () => {
   gracefulShutdown('app termination', () => {
     process.exit(0);
   });
 });

 // For Heroku app termination
 process.on('SIGTERM', () => {
   gracefulShutdown('Heroku app shutdown', () => {
     process.exit(0);
   });
 });
