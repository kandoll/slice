const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  comment: String
});
const User = mongoose.model("users", UserSchema);
/*
var comm = new User({
    username:'kanik',
    googleId:'poooooop',
    thumbnail:'ooooooooop',
    comment:'This is a default comment2 by admin'
});

comm.save().then(()=>{
    console.log('admin comment created');
}) 
*/

module.exports = User;
