const Admin = require("../model/Admin");
const Order = require("../model/Order");

var passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");
module.exports = function(app) {
  app.get("/admin", function(req, res) {
    res.render("admin.ejs");
  });

  app.get("/welcomeadmin", ensureAuthenticated, function(req, res) {
    Order.find({}, function(err, data) {
      console.log(data);
      if (err) throw err;
      else res.render("welcomeadmin", { orders: data });
    });
  });

  //admin login handle

  app.post(
    "/admin",
    passport.authenticate("local", {
      successRedirect: "/welcomeadmin",
      failureRedirect: "/gallery"
    })
  );

  //admin logiut handle
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/admin");
  });
};
