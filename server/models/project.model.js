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
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the project
 *         title:
 *           type: string
 *           description: The title of the project
 *         description:
 *           type: string
 *           description: The short description of the project
 *         key:
 *           type: string
 *           description: The unique search key for the project
 *         members:
 *           type: array
 *           description: The list of users assigned to the project
 *           items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The id of the user
 *                  role:
 *                      type: string
 *                      description: The role of the user
 *         board:
 *           type: string
 *           description: The id of the board
 *         teamLead:
 *           type: string
 *           description: The id of the user
 */

const ProjectSchema = new Schema({
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
  board: { type: mongoose.Types.ObjectId, ref: 'list' },
  teamLead: { type: mongoose.Types.ObjectId, required: true },

});

module.exports = mongoose.model('project', ProjectSchema);
