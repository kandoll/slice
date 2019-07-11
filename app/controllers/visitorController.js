const Order = require("../model/Order");
const { ensureAuthenticated } = require("../config/auth");
const passport = require("passport");
const User = require("../model/User");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  //-----------------------------------------HOME---------------------------------------------
  app.get("/home", function(req, res) {
    res.render("index.ejs");
  });
  //---------------------------------GALLERY-----------------------------------------------
  app.get("/gallery", function(req, res) {
    res.render("gallery.ejs");
  });
  app.get("/modal", function(req, res) {
    res.render("modal.ejs");
  });
  //get data from mongodb and pass it to view
  app.get("/clientgallery", function(req, res) {
    User.find({}, (err, data) => {
      if (err) throw err;
      res.render("clientgallery", { users: data });
    });
  });

  //get data from view and add it to mongodb
  app.post("/clientgallery", urlencodedParser, function(req, res) {
    var newUser = User(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  //---------------------------------------FAQS-------------------------------------------

  app.get("/faqs", function(req, res) {
    res.render("faqs.ejs");
  });

  //----------------------------ORDER-------------------------------------------------

  app.get("/order", function(req, res) {
    res.render("order.ejs");
  });

  
  app.get("/edt", function(req, res) {
    res.render("edt.ejs");
  });
  //--------------------------------ORDER-PLACED-----------------------------------------------
  app.get("/order-placed", function(req, res) {
    res.render("order-placed.ejs");
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
