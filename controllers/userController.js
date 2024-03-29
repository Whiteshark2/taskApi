const User=require('../model/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

module.exports.create=async function(req,res){
   try {
    const user=await User.findOne({phone:req.body.phone})
    
    if(!user){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user=await User.create({
            phone:req.body.phone,
            password:hashedPassword,
            priority:req.body.priority
        })
        return res.json(200,{
            message:"User added to database",
            user:user
        })
    }else{
        return res.json(422,{
            message:"User already exist! try another phone number/Invalid phone number length"
        })
    }
   } catch (error) {
    return res.json(500,{
        message:"Internal server error "
    })
   }
}

module.exports.createSession=async function(req,res){
    try {
        const user=await User.findOne({phone:req.body.phone})
        if(!user|| !(await bcrypt.compare(req.body.password, user.password))){
            return res.json(422,{
                message:"Invalid phone number/Passoword"
            })
        }
        return res.json(200,{
            message:"Sign in successful,here is your token",
            data:{
                token: jwt.sign(user.toJSON(),'taskApp123',{expiresIn:'7d'})
            }
        })
    } catch (error) {
        
    }
}