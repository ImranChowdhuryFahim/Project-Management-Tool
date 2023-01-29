/* eslint-disable no-unused-vars */
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
 *         displayName:
 *           type: string
 *         email:
 *           type: string
 *         avatarLink:
 *           type: string
 *         password:
 *           type: string
 *         projects:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                project:
 *                  type: object
 *                role:
 *                  type: string
 *         workspaces:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                workspace:
 *                  type: object
 *                role:
 *                  type: string
 *
 */

const teamLeadSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  displayName: { type: String },
  email: { type: String },
  avatarLink: { type: String },
});

const ProjecSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  title: { type: String },
  key: { type: String },
  description: { type: String },
  teamLead: teamLeadSchema,

});

const workspaceSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  title: { type: String },
  key: { type: String },
});

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, trim: true,
  },
  avatarLink: { type: String, default: null },
  password: { type: String, required: true },
  projects: [{ type: mongoose.Types.ObjectId, ref: 'project' }],
  workspaces: [{ workspace: { type: mongoose.Types.ObjectId, ref: 'workspace' }, role: { type: String } }],
});

module.exports = mongoose.model('user', UserSchema);
