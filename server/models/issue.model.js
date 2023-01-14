const mongoose = require('mongoose');

const { Schema } = mongoose;

const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Number,
  },
  assignee: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
});

module.exports = mongoose.model('issue', issueSchema);
