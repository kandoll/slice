var express = require('express');
var app=express();
var db = require('./config/connectdb');
//var flash = require('connect-flash');
var session=require('express-session')

var passport = require('passport');
const keys=require('./config/keys');
//const cookieSession=require('cookie-session');


//Passport config
require('./config/passport')(passport);

var adminController = require('./controllers/adminController');
var visitorController = require('./controllers/visitorController');


//set template engine
app.set('view engine','ejs')

//cookie sesssion
/*
app.use(cookieSession({
maxAge:24*60*60*1000,
keys:[keys.session.cookieKey]
})); */

//body-parser
app.use(express.urlencoded({extended:false}));


//express session middleware

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

//connect flash
//app.use(flash());

//Global variables 

/*
app.use(function(req,res,next){
  res.locals(success_msg=req.flash('success_msg'));
  res.locals(error_msg=req.flash('error_msg'));
  next();

})  */
  //passport

app.use(passport.initialize());
app.use(passport.session());



//setting static files

app.use(express.static('public'));


//fire controllers
adminController(app);
visitorController(app);



//listen to port

app.listen(3000);
console.log('you are listening to port 3000')
