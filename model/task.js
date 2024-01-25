const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:[3,"minlength should be 3"]
    },
    description:{
        type:String,
        required:[true,"why no description?"]
    },
    due_date:{
        type:Date,
        required:true,
        set: (value) => new Date(value.setHours(0, 0, 0, 0)),
    },
    status:{
        type:String,
        required:true,
        enum:['todo','inprogress','done']
    },
    priority:{
        type:Number,
        required:true,
        enum:[0,1,2,3]
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    subtasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subtask'
    }]
},{
    timestamps:true
})

const Task=mongoose.model('Task',taskSchema)

module.exports=Task