const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    due_date:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        default:'Todo'
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
},{
    timestamps:true
})

const Task=mongoose.model('Task',taskSchema)

module.exports=Task