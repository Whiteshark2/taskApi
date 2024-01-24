const Task=require('../model/task')
const SubTask=require('../model/subtask')



module.exports.create=async function(req,res){
    try {
        const task=await Task.findById(req.body.task_id)
        if(!task){
            return res.status(404).json({
                message:"No Task Found",
            })
        }
        const subtask=await SubTask.create({
            task_id:req.body.task_id,
            status:req.body.status
        })
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
        if(!filter){
            return res.status(404).json({
                message:"No subtask found"
            })
        }
        const updateSubtask=await SubTask.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true})
        return res.status(200).json({
            message:"here is update subtask",
            updateSubtask
        })
    } catch (error) {
        
    }
}
