const mongoose = require('mongoose');

//connect db
mongoose.connect('mongodb://localhost/myslice');

mongoose.connection.once('open',()=>{
    console.log('connection has been made to the database')
}).on('err',()=>{
    console.log('connection has NOT been made to the database')

});

