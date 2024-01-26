const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    phone:{
        type:String,
        unique:[true,"Phone Already in use"],
        validate: {
            validator: function (value) {
                // match phone number along with country code
              const phoneNumberRegex = /^\+\d{1,4}-?\d{10}$/;
              return phoneNumberRegex.test(value);
            },
            message: 'Please enter a valid phone number with country code.',
          },
          required: [true, 'Phone number is required.'],
        },
    password:{
        type:String,
        required:true,
        minLength:[6,"password min length is 6"]
    },
    priority:{
        type:Number,
        enum:[0,1,2],
        required:true
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema)
module.exports=User