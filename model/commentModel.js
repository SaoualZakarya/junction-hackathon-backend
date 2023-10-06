const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Comments', comment)