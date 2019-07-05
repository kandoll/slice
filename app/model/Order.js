const mongoose= require('mongoose');

//order schema
var orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    sheet:{
        type:String,
        required:true
    },
    kind:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    }
});


//model order
var Order =mongoose.model('Order',orderSchema);


module.exports= Order;