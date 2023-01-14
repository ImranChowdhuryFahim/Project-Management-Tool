const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  issues: [{ type: mongoose.Types.ObjectId, ref: 'issue' }],
  board: [{ type: mongoose.Types.ObjectId, ref: 'list' }],
});

module.exports = mongoose.model('list', listSchema);
