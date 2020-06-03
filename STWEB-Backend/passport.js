var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var keys = require('./app_server/config/keys')
var User = require('./app_server/models/usuario');

passport.serializeUser(function(user, done) {
    console.log(user)
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
  async function(accessToken, refreshToken, profile, done) {
      user = new User()
      user.nombre= profile._json.given_name
      user.apellidos = profile._json.family_name
      user.email = profile._json.email
      const existUser = await User.find({email : profile._json.email}, function (err,res){
        if (err) {console.log("Error") ; return done(Error("BD Error"))}
      })
      if (existUser.length == 0){
          await user.save(function (err,res){
            if (err) {console.log("Error"); return done(Error("BD Error"))}
          })
      }
      return done(null,user);
  }
  ));