const passport=require('passport')
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt
const User=require('../model/user')

let opts={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'taskApp123',
}

passport.use(new JWTStrategy(opts, async function(jwt_payload, done) {
    
    try {
        const user=await User.findById(jwt_payload._id)
        if(user){
            return done(null,user)
            }else{
            return done(null,false)
        }
        
    } catch (error) {
        console.log("Error in finding user")
        return;
    }
}));

module.exports=passport