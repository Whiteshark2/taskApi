const mongoose=require('mongoose')

const subtaskSchema=new mongoose.Schema({
    task_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
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