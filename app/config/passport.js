var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/Admin');
const GoogleStrategy=require('passport-google-oauth20')
const keys=require('./keys')
const User=require('../model/User');

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
       User.findById(id).then((user) => {
          done(null, user);
          
        }); })
      
        /*
         Admin.findById(id, function(err, user) {
           if(err){
            User.findById(id).then((user) => {
              done(null, user);
              
            });
           }
          done(err, user);
        });
      });  */
      
    /*  passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, user) {
          done(err, user);
        });
      });  */

      passport.use(
        new GoogleStrategy({
        //options for strategy
        callbackURL:'/auth/google/redirect',
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret
      },(accessToken,refreshToken,profile,done)=>{
        //passport callback function
        
        //console.log('passport callback function fired');
        console.log(profile);

        //check if user already exists

        User.findOne({googleId:profile.id}).then((currentUser)=>{
if(currentUser){
  //already a user
  console.log('user is',currentUser);
  done(null,currentUser);
}else{
 // create new user

 new User({
  username:profile.displayName,
  googleId:profile.id,
  thumbnail:profile._json.picture
}).save().then((newUser)=>{
  console.log('new user created:'+newUser)
  done(null,newUser);
})
}
        })

       
            })
      )
}