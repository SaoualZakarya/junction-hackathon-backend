const mongoose = require('mongoose')

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    hash:{
        type:String,
        required:true,
    },
    salt: {
        type:String,
        required: true
    },
    pending:{
        type:String,
        enum:['pending','accepted'],
        default:'pending'
    },
    accountType:{
        type:String,
        enum:['adult',"child"],
        default:"child"
    },
    role:{
        type : String ,
        enum:['student',"admin","teacher"],
        default:"student"
    },
    field:{
        type:mongoose.Schema.Types.ObjectId,
        required:false
    }
});

//Export the model
module.exports = mongoose.model('userModel', userSchema)