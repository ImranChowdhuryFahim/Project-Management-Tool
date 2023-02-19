const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - teamLead
 *         - workspaceKey
 *       properties:
 *         _id:
 *           type: string
 *         workspaceKey:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         key:
 *           type: string
 *         members:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                member:
 *                  type: object
 *                role:
 *                  type: string
 *         teamLead:
 *              type: object
 */
// eslint-disable-next-line no-unused-vars
const memberSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  displayName: { type: String },
  email: { type: String },
  avatarLink: { type: String },
});

const ProjectSchema = new Schema({
  workspaceKey: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  key: { type: String, required: true, unique: true },
  members: [{ member: { type: mongoose.Types.ObjectId, ref: 'user' }, role: { type: String } }],
  teamLead: { type: mongoose.Types.ObjectId, ref: 'user' },

}, { timestamps: true });

module.exports = mongoose.model('project', ProjectSchema);
