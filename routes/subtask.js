const express=require('express')
const router=express.Router()
const passport=require('passport')
const subTaskController=require('../controllers/subtaskController')

router.post('/create',passport.authenticate('jwt',{session:false}),subTaskController.create)

router.get('/getSubTask/:id',subTaskController.getAllSubTaskByTaskID)

router.patch('/update/:id',passport.authenticate('jwt',{session:false}),subTaskController.update)

router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),subTaskController.delete)

module.exports=router