var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('./app_server/models/db');
var keys = require('./app_server/config/keys')

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var hotelsRouter = require('./app_server/routes/hotels');
var sheltersRouter = require('./app_server/routes/shelters');
var apartmentsRouter = require('./app_server/routes/apartments');
var ruralHousesRouter = require('./app_server/routes/ruralHouses');
var campingsRouter = require('./app_server/routes/campings');
var authRouter = require('./app_server/routes/auth');

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

//Middleware
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);
app.use('/shelters', sheltersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/ruralHouses', ruralHousesRouter);
app.use('/campings', campingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.json({ status: 'Error', mensaje: err.message })
});

module.exports = app;
