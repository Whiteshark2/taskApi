const express=require('express')
const router=express.Router()
const passport=require('passport')
const subTaskController=require('../controllers/subtaskController')

router.post('/create',passport.authenticate('jwt',{session:false}),subTaskController.create)

router.get('/getSubTask/:id',subTaskController.getAllSubTaskByTaskID)

router.patch('/update/:id',subTaskController.update)
router.delete('/delete/:id',subTaskController.delete)

module.exports=router