/*
 * Configuración del proyecto
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
var request = require('request');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

require('./app_server/models/db');
var keys = require('./app_server/config/keys')

var usersRouter = require('./app_server/routes/users');
var hotelsRouter = require('./app_server/routes/hotels');
var sheltersRouter = require('./app_server/routes/shelters');
var apartmentsRouter = require('./app_server/routes/apartments');
var ruralHousesRouter = require('./app_server/routes/ruralHouses');
var campingsRouter = require('./app_server/routes/campings');
var restaurantsRouter = require('./app_server/routes/restaurants');
var touristOfficesRouter = require('./app_server/routes/touristOffices');
var informationPointsRouter = require('./app_server/routes/informationPoints');
var guidesRouter = require('./app_server/routes/guides');
var authRouter = require('./app_server/routes/auth');
var parserDataRouter = require('./app_server/routes/parserData');
var chatsRouter = require('./app_server/routes/chats');
var mediaRouter = require('./app_server/routes/media');
var statisticsRouter = require('./app_server/routes/statistics');
var userScheduled = require('./app_server/scheduled/userScheduled');

var app = express();
app.use(passport.initialize());
app.use(passport.session());
require('./passport')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(function () {
  userScheduled.bannedUsers();
});

// Middleware
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);
app.use('/shelters', sheltersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/ruralHouses', ruralHousesRouter);
app.use('/campings', campingsRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/touristOffices', touristOfficesRouter);
app.use('/informationPoints', informationPointsRouter);
app.use('/guides', guidesRouter);
app.use('/parserdata', parserDataRouter);
app.use('/chats', chatsRouter);
app.use('/media', mediaRouter);
app.use('/statistics', statisticsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  console.log(err)
  res.json({ status: 'Error', mensaje: err.message })
});

module.exports = app;
