const express=require('express')
const router=express.Router()
const passport=require('passport')
const taskController=require('../controllers/taskController')

router.post('/createTask',passport.authenticate('jwt',{session:false}),taskController.createTask)

router.get('/getAllTask',taskController.getAllTask)
router.get('/getAllTask/:status',taskController.getAllTaskByStatus)

router.patch('/update/:id',passport.authenticate('jwt',{session:false}),taskController.updateTask)

router.get('/getAllTask/:date',taskController.filterTaskDueDate)

router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),taskController.delete)

router.get('/getonPriority',taskController.getAllTaskPriority)


module.exports=router