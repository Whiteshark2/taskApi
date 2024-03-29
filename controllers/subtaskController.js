const Task=require('../model/task')
const SubTask=require('../model/subtask')
const User=require('../model/task')
const Subtask = require('../model/subtask')
const { all } = require('../routes')



module.exports.create=async function(req,res){
 
    try {
        const task=await Task.findById(req.body.task)
        if(!task){
            return res.status(404).json({
                message:"No Task Found",
            })
        }
        const subtask=await SubTask.create({
            task:req.body.task,
            status:(req.body.status),
            user:req.user._id
        })
        task.subtasks.push(subtask)
        await task.save()
        return res.status(200).json({
            message:"Subtask created successfully",
            subtask
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
    })
    }
}

module.exports.getAllSubTaskByTaskID=async function(req,res){
    try {
        const task=await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message:"No task found",
                subtask
            })
        }
        const subtask=await SubTask.find({task_id:req.params.id})
        return res.status(200).json({
            message:`Here is all task with id - ${req.params.id}`,
            subtask
        })

    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
    })
    }
}


module.exports.update=async function(req,res){
    try {
        const filter=await SubTask.findById(req.params.id)
        if(!filter||req.user.id!=filter.user){
            return res.status(404).json({
                message:"No subtask found"
            })
        }
        const updateSubtask=await SubTask.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})
        const relatedSubtasks = await Subtask.find({ task: filter.task });
        const anyCompleted= relatedSubtasks.some(sub=> sub.status===1)
        console.log(anyCompleted)
        const allCompleted=await relatedSubtasks.every(sub=>sub.status===1)
        if(allCompleted){
            await Task.findByIdAndUpdate(filter.task,{status:'done'},{new:true})
        }else if(anyCompleted){
            await Task.findByIdAndUpdate(filter.task,{status:'inprogress'},{new:true})
        }
        return res.status(200).json({
            message:"here is update subtask",
            updateSubtask
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error"
    })
    }
}
module.exports.delete=async function(req,res){
    try {
        const subtask=await Subtask.findById(req.params.id)
        console.log(subtask.user)
        if(subtask|| subtask.user==req.user.id){
           let taskId=subtask.task
           await SubTask.findByIdAndDelete(req.params.id)
           let task=await Task.findByIdAndUpdate(taskId,{$pull:{subtasks:req.params.id}})
            return res.status(200).json({
                message:`Deleted subtask by id - ${req.params.id}`,task
            })
        }
        return res.status(401).json({
            message:"Not authorised to delete"
        })
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error"
    })
    }
}