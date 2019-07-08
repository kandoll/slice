const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:String,
    googleId:String,
    thumbnail:String
});
const User = mongoose.model('users',UserSchema);
module.exports=User;