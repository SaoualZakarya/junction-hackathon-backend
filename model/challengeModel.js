const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var challengeSchema = new mongoose.Schema({
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    question:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    choises:{
        type:Array,
        required:true,
    },
    point:{
        type : Number ,
        default : 50,
    },
    level:{
        type : String ,
        enum:['easy','meduim','diffcult'],
        default:"easy",
    }
});

//Export the model
module.exports = mongoose.model('Challenge', challengeSchema);