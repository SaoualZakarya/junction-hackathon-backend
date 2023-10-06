const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
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
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    ref: "Comment",
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', Post);