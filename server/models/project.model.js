const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  key:
  {
    type: String,
    required: true,
    unique: true,
  },
  members: [{ type: mongoose.Types.ObjectId, role: { type: String, required: true }, ref: 'user' }],
  board: [{ type: mongoose.Types.ObjectId, ref: 'list' }],

});

module.exports = mongoose.model('project', projectSchema);
