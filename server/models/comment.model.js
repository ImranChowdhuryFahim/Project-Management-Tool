const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports = mongoose.model('comment', commentSchema);
