const bcrypt = require('bcrypt')

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
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
});


userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        return next()
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.isPasswordMatched = async function (entredPassword){
    return await bcrypt.compare(entredPassword,this.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema);