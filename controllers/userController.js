const User=require('../model/user')
const jwt=require('jsonwebtoken')

module.exports.create=async function(req,res){
   try {
    const user=await User.findOne({phone:req.body.phone})
    if(!user){
        const user=await User.create(req.body)
        return res.json(200,{
            message:"User added to database",
            user:user
        })
    }else{
        return res.json(422,{
            message:"User already exist! try another phone number"
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
        if(!user||user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid phone number/Passoword"
            })
        }
        return res.json(200,{
            message:"Sign in successful,here is your token",
            data:{
                token: jwt.sign(user.toJSON(),'taskApp123',{expiresIn:'10000'})
            }
        })
    } catch (error) {
        
    }
}