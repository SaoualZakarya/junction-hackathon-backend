const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


// Declare the Schema of the Mongo model
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
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
    password:{
        type:String,
        required:true,
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


studentSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
})

studentSchema.methods.isPasswordMatched = async function (entredPassword){
    return await bcrypt.compare(entredPassword,this.password)
}

//Export the model
module.exports = mongoose.model('Student', studentSchema)