/* eslint-disable no-unused-vars */
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
 *         title:
 *           type: string
 *         key:
 *           type: string
 *           description: the unique search key
 *         members:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                member:
 *                  type: object
 *                role:
 *                  type: string
 *         invitedUsers:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *         owner:
 *           type: string
 */

const memberSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  displayName: { type: String },
  email: { type: String },
  avatarLink: { type: String },
});

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

const WorkspaceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  key: { type: String, required: true },
  members: [{ member: { type: mongoose.Types.ObjectId, ref: 'user' }, role: { type: String } }],
  invitedUsers: [{ email: { type: String } }],
  owner: { type: mongoose.Types.ObjectId, ref: 'user' },

}, { timestamps: true });
module.exports = mongoose.model('workspace', WorkspaceSchema);
