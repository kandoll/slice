var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/Admin');


//-----------------------------------------------------------------------
module.exports=function(passport){
  passport.use(new LocalStrategy(
    function(username, password, done) {
      Admin.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));


    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, user) {
          done(err, user);
        });
      });
}