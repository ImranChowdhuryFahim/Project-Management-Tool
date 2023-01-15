const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - displayName
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the user
 *         displayName:
 *           type: string
 *           description: The displayable name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         avatarLink:
 *           type: string
 *           description: The gravatar link of the user
 *         password:
 *           type: string
 *           description: The hash password of the user
 *         projects:
 *           type: array
 *           description: The list of projects of the user
 *           items:
 *              type: string
 *              description: The id of the project
 *         workspaces:
 *           type: array
 *           description: The list of workspaces of the user
 *           items:
 *              type: string
 *              description: The id of the workspace
 */

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
  projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],
  workspaces: [{ type: mongoose.Types.ObjectId, ref: 'workspace' }],
});

module.exports = mongoose.model('user', UserSchema);
