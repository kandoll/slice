
const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },

});

AdminSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
}; 

const Admin = mongoose.model('Admin',AdminSchema);
/*
var ad = new Admin({
    username:'kandollplay@gmail.com',
    password:'123456'
});

ad.save().then(()=>{
    console.log('admin created');
}) */

module.exports = Admin;