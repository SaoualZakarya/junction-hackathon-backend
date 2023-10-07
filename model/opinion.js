const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var opinionSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
    },
    image:{
        type:String,
        default:'http://localhost:5000/images/person.jpg'
    }
});

//Export the model
module.exports = mongoose.model('Opinion', opinionSchema);