const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    phone:{
        type:Number,
        unique:true,
        required:true
    },
    priority:{
        type:Number,
        enum:[0,1,2]
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema)
module.exports=User