const mongoose = require('mongoose');

const { Schema } = mongoose;

const workspaceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],
  members: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  invitedUsers: [{ email: { type: String, required: true, unique: true } }],
  activities: [{ text: { type: String }, timestamp: { type: Date, default: Date.now } }],

});

module.exports = mongoose.model('workspace', workspaceSchema);
