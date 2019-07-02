var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var db;

// Connection URL
const url = 'mongodb://kanika:kanika1@ds245387.mlab.com:45387/slice';
 
// Database Name
const dbName = 'slice';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
   db = client.db(dbName);

 
});

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------------home---------------------------------------------
app.get('/home',function(req,res){
res.render('index.ejs');
});
//---------------------------------gallery-----------------------------------------------
app.get('/gallery',function(req,res){
    res.render('gallery.ejs');
});

app.get('/clientgallery',function(req,res){
    res.render('clientgallery.ejs');
});
//---------------------------------------faqs-------------------------------------------
app.get('/faqs',function(req,res){
    res.render('faqs.ejs');
});


//------------------------Order------------------------------------------------------
    app.get('/order',function(req,res){
        res.render('order.ejs');
    });


app.post('/order', urlencodedParser, function(req,res){
    console.log(req.body);
    var data= req.body;
    db.collection("slice").insertOne(data,function(err,result){
        if(err) {
            console.log("there is an error");
            console.log(err);
            return res.redirect('back');
        };
        
        console.log('order-placed'); 
        res.render('order-placed.ejs',{data:req.body});
    });



        });


//------------------------Admin-------------------------------------------------------

app.get('/admin',function(req,res){
    res.render('admin.ejs');
})

app.post('/admin',passport.authenticate('local',{
    successRedirect:'/home',
    failureRedirect:'/admin'
}));

       // ----------------------------------------------------------------------------------------
       passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log(username);
            console.log(password);

            return done(null, 'dsf');
          }
          ));
        
      


       //-------------------------------------------------------------------------------------
app.listen(3000);
