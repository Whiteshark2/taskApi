const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')

router.post('/register',userController.create)
router.post('/login',userController.createSession)


module.exports=router