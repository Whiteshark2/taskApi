const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    phone:{
        type:String,
        unique:[true,"Phone Already in use"],
        required:true,
        minLength:10,
        maxLength:[10,"Phone number length should be 10"]
        
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"password min length is 6"]
    },
    priority:{
        type:Number,
        enum:[0,1,2],
        required:true
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema)
module.exports=User