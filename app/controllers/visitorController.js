const Order = require("../model/Order");
const { ensureAuthenticated } = require("../config/auth");
const passport = require("passport");
const User = require("../model/User");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


/*const authCheck=(req,res,next)=>{
if(!req.user){
//if user is not logged in
res.redirect('/login');
}else{
  next();
}
};  */

module.exports = function(app) {
  //-----------------------------------------HOME---------------------------------------------
  app.get("/home", function(req,res) {
    res.render("index.ejs",{user:req.user});
  });
  //---------------------------------GALLERY-----------------------------------------------
  app.get("/gallery", function(req, res) {
    res.render("gallery.ejs",{user:req.user});
  });

  /*
  app.get("/clientgallery",authCheck,function(req, res) {
    res.render("clientgallery.ejs",{user:req.user});
  });

  */

  

//--------------------------------------------------------------

  //get data from mongodb and pass it to view
  app.get("/clientgallery",function(req, res) {
    User.find({}, (err, data) => {
      if (err) throw err;
      res.render("clientgallery", { users: data,user:req.user});
    });
  });

  //--------------------------delete comment----------------------------------------
  app.delete('/clientgallery/:comment',function(req,res){

    // delete the requested item from mongodb

    User.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

 //------------------------------------------------------------------------------
  //get data from view and add it to mongodb
  app.post("/clientgallery", urlencodedParser, function(req, res) {
    var newCom = User(req.body).save(function(err, data) {
      console.log({users: data,user:req.user});
      if (err) throw err;
      res.json(data);
    }); 
  }); 

  //---------------------------------------FAQS-------------------------------------------

  app.get("/faqs", function(req, res) {
    res.render("faqs.ejs",{user:req.user});
  });
//---------------------Visiter Logout page-------------------------------------------------
app.get("/auth/logout", function(req, res) {
  req.logout();
  res.redirect('/home');
});
  //----------------------Visiter Login page---------------------------------------------
  
  app.get("/login", function(req, res) {
    res.render("login.ejs",{user:req.user});
  });

  //------------------login with GOOGLE------------------------------------------
  app.get("/auth/google",passport.authenticate('google',{
    scope:['profile']
  }));
//-----------------------callback route for google to redirect to-----------------------------
app.get("/auth/google/redirect",passport.authenticate('google'),(req,res)=>{
res.redirect('/clientgallery/')
});
  //----------------------------ORDER-------------------------------------------------

  app.get("/order", function(req, res) {
    res.render("order.ejs",{user:req.user});
  });

  
  app.get("/edt", function(req, res) {
    res.render("edt.ejs");
  });
  //--------------------------------ORDER-PLACED-----------------------------------------------
  app.get("/order-placed", function(req, res) {
    res.render("order-placed.ejs",{user:req.user});
  });

  //order handle
  app.post("/order", (req, res) => {
    const body = ({ name, email, phone, sheet, kind, date, info } = req.body);
    let errors = [];

    //check required fields
    if (!name || !email || !phone || !sheet || !kind || !date || !info) {
      errors.push({ msg: "Please fill in all fields" });
    }

    //check phone number length

    if (phone.length < 10) {
      errors.push({ msg: "Phone number should be 10 digits" });
    }

    if (errors.length > 0) {
      res.render("order", {
        errors,
        name,
        email,
        phone,
        sheet,
        kind,
        date,
        info
      });
    } else {
      //Validation passes
      Order.findOne({ name: name }).then(order => {
        if (order) {
          //order exists
          errors.push({ msg: "Order already exists" });

          res.render("order", {
            errors,
            name,
            email,
            phone,
            sheet,
            kind,
            date,
            info
          });
        } else {
          var neworder = new Order({
            name,
            email,
            phone,
            sheet,
            kind,
            date,
            info
          });

          // console.log(neworder)

          neworder
            .save()
            .then(order => {
              /*   req.flash('success_msg','You have placed your order'); */
              res.redirect("/order-placed");
            })
            .catch(err => console.log(err));
          //   res.send('hellooooo');
        }
      });
    }
  });
};
