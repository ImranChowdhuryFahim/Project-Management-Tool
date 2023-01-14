const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Workspace:
 *       type: object
 *       required:
 *         - title
 *         - key
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the workspace
 *         title:
 *           type: string
 *           description: The title of the workspace
 *         key:
 *           type: string
 *           description: The unique searchable key of the workspace
 *         projects:
 *           type: array
 *           description: The list of projects
 *           items:
 *              type: string
 *              description: The id of the project
 *         members:
 *           type: array
 *           description: The list of ids of users
 *           items:
 *              type: string
 *              description: The id of the user
 *         invitedUsers:
 *           type: array
 *           description: The list of ids of invited users
 *           items:
 *              type: string
 *              description: The id of the user
 *         activities:
 *           type: array
 *           description: The list of activities
 *           items:
 *              type: object
 *              properties:
 *                  text:
 *                      type: string
 *                      description: The description of the activity
 *                  timestamp:
 *                      type: date
 *                      description: The time of the activity
 */

const workspaceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  key: {
    type: String,
    required: true,
  },
  projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],
  members: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  invitedUsers: [{ email: { type: String, unique: true } }],
  activities: [{ text: { type: String }, timestamp: { type: Date, default: Date.now } }],

});

module.exports = mongoose.model('workspace', workspaceSchema);
