const express=require('express')
const app=express()
const db=require('./config/mongoose')




const port=8000

app.listen(port,function(err){
    if(err){
        console.log("error in listening")
    }
    console.log(`Server started at port ${port}`)
})