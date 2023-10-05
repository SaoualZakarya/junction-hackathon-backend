const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const {genPassword, validatePassword} = require('../utils/passwordUtils');



// Declare the Schema of the Mongo model
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
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
        unique:true,
    },
    hash:{
        type:String,
        required:true,
    },
    salt: {
        type:String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    field:{
        type:mongoose.Schema.Types.ObjectId,
        required:false
    }
});


// studentSchema.pre('save',async function (next) {
//     if(!this.isModified('password')){
//         return next()
//     }

//     const secret = genPassword(this.password)

//     this.hash = secret.hash;
//     this.salt = secret.salt;
// })

// studentSchema.methods.isPasswordMatched = async function (entredPassword){
//     return validatePassword(entredPassword, this.hash, this.salt)
//     // return await bcrypt.compare(entredPassword,this.password)
// }

//Export the model
module.exports = mongoose.model('Student', studentSchema)