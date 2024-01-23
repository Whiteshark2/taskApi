const mongoose=require('mongoose')
 mongoose.connect('mongodb://localhost/taskApp')

 const db=mongoose.connection

 db.on('error',console.error.bind(console,"Error on connecting to DB"))
 
 db.once('open',function(){
    console.log("Connected to DB")
 })

 module.exports=db