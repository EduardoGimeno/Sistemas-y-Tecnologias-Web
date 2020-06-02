var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('./app_server/models/db');
var keys = require('./app_server/config/keys')

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var authRouter = require('./app_server/routes/auth')

var app = express();
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use(new GoogleStrategy({
  clientID: keys.clienteID,
  clientSecret: keys.secretID,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null,profile);
}
));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Middleware

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
  res.json({ status: 'Error' })
});

module.exports = app;
