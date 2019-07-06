
//Order model
const Order=require('../model/Order')
const { ensureAuthenticated }= require('../config/auth');

module.exports=function(app){

//-----------------------------------------HOME---------------------------------------------
app.get('/home',function(req,res){
    res.render('index.ejs');
    });
//---------------------------------GALLERY-----------------------------------------------
app.get('/gallery',function(req,res){
    res.render('gallery.ejs');
});
    
app.get('/clientgallery',function(req,res){
        res.render('clientgallery.ejs');
});

//---------------------------AUTH LOGIN----------------------------------------------------
app.get('/auth/login',(req,res)=>{
    res.render('login');
})


//---------------------------AUTH LOGOUT---------------------------------------------------
app.get('/auth/logout',(req,res)=>{
    res.send('logging out');
        //handle with passport

})

//----------------------AUTH WITH GOOGLE---------------------------------------------------
app.get('/auth/google',(req,res)=>{
    //handle with passport
    res.send('loggng in with google');
})
//---------------------------------------FAQS-------------------------------------------
    
app.get('/faqs',function(req,res){
        res.render('faqs.ejs');
});
    
    
//----------------------------ORDER-------------------------------------------------

app.get('/order',function(req,res){
    res.render('order.ejs');
});
//--------------------------------ORDER-PLACED-----------------------------------------------
app.get('/order-placed',ensureAuthenticated,function(req,res){
            res.render('order-placed.ejs');
 });
   
 
 //order handle
app.post('/order',(req,res)=>{
const body={name,email,phone,sheet,kind,date,info}=req.body;
let errors=[];

//check required fields
    if(!name || !email || !phone ||!sheet  || !kind || !date || !info){
        errors.push({msg:'Please fill in all fields'});
    }

    //check phone number length

    if(phone.length<10){
        errors.push({msg:'Phone number should be 10 digits'});
    }

    if(errors.length>0){
        res.render('order',{
            errors,
            name,
            email,
            phone,
            sheet,
            kind,
            date,
            info
        });
    
        }

    else{
        //Validation passes
      Order.findOne({name:name})
      .then(order=>{
          if(order){
           //order exists
            errors.push({msg:'Order already exists'});

            res.render('order',{
                errors,
                name,
                email,
                phone,
                sheet,
            kind,
            date,
            info
               });
          }
          else{
              var neworder = new Order({
                  name,
                  email,
                  phone,
                  sheet,
            kind,
            date,
            info
              });

              console.log(neworder)

              neworder.save()
              .then(order=>{
               /*   req.flash('success_msg','You have placed your order'); */
                  res.redirect('/order-placed');
              })
              .catch(err=>console.log(err))
           //   res.send('hellooooo');
          }
      })
      
    }
    
 
} );

        
}