const { model } = require('mongoose')
const Task=require('../model/task')
const User=require('../model/user')
const Subtask = require('../model/subtask')

module.exports.createTask=async function(req,res){
    try {
        const task=await Task.findOne({title:req.body.title})
        if(!task||task===null){
            const newTask=await Task.create({
                title:req.body.title,
                description:req.body.description,
                due_date:new Date(req.body.due_date),
                status:(req.body.status),
                user:req.user._id,
                priority:Number(req.body.priority)
            })
            return res.status(200).json({
                message:"Task created successfully",
                newTask
            })
        }
        return res.status(422).json({
            message:"task with same title Already exist change the title name",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error",
           
        })
    }
}

module.exports.getAllTask=async function(req,res){
    try {
        let page=Number(req.query.page)||1
        let limit=Number(req.query.limit)||5
        let skip=(page-1)*limit
        const task=await Task.find()
        .skip(skip).limit(limit)
        return res.status(200).json({
            task
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports.getAllTaskByStatus=async function(req,res){
    try {
        let page=Number(req.query.page)||1
        let limit=Number(req.query.limit)||3
        let skip=(page-1)*limit
        const task=await Task.find({status:req.params.status}).skip(skip).limit(limit)
        return res.status(200).json({
            task
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
    })
}}

module.exports.getAllTaskPriority=async function(req,res){
    try {
        let priority=Number(req.query.priority)
        const task=await Task.find({priority:priority})
        return res.status(200).json({
            message:"Here are task based on  priority",
            task
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


module.exports.updateTask=async function(req,res){
    try {
        const filter=await Task.findById(req.params.id)
        if (!filter||filter.user!=req.user.id) {
            return res.status(404).json({
                message:"Not Authorised to update",
            });
        }
        const updatedTask=await Task.updateOne(filter,req.body,{new:true})
        return res.status(200).json({
            message: 'Task updated successfully',
            task:updatedTask,
        });

    } catch (error) {
        return res.status(500).json({
         message:"Internal server error"
    })
}
}

module.exports.filterTaskDueDate=async function(req,res){
    console.log(req.params.date)
    try {
        
        const task=await Task.find({ due_date: { $lt: new Date(req.params.date) } })
        // return task which due date less than targeted date
        return res.status(200).json({
            message: 'Here is task ',
            task,
        });

    } catch (error) {
        return res.status(500).json({
         message:"Internal server error"
    })
    }
}

module.exports.delete=async function(req,res){
    try {
        const task=await Task.findById(req.params.id)
        if(task.user==req.user.id){
            await task.deleteOne();
            const subtask=await Subtask.deleteMany({task:task})
            return res.status(200).json({
                message:"Task successfully deleted and its associated subtask",
                
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
       })
    }
}

