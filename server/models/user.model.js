const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  avatarLink: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
    default: '',
  },
  projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],
  workspaces: [{ type: mongoose.Types.ObjectId, ref: 'workspace' }],
  notifications: [{ text: { type: String }, timestamp: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model('user', UserSchema);
