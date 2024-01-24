const mongoose=require('mongoose')

const subtaskSchema=new mongoose.Schema({
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:Number,
        enum:[0,1],
        default:0,
    }
},{
    timestamps:true,
})

const Subtask=mongoose.model('Subtask',subtaskSchema)
module.exports=Subtask