const express=require('express')
const router=express.Router()

router.use('/user',require('./user'))
router.use('/task',require('./task'))
router.use('/subtask',require('./subtask'))

module.exports=router