require('dotenv').config()
const express=require('express')
const app=express()
const db=require('./config/mongoose')
const passport=require('passport')
const passportJWT=require('./config/passport-jwt-strategy')
const cron=require('./config/twilio')



app.use(express.urlencoded())
app.use('/api',require('./routes'))


const port=process.env.port||8000

app.listen(port,function(err){
    if(err){
        console.log("error in listening")
    }
    console.log(`Server started at port ${port}`)
})