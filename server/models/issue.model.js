const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Issue:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - order
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the issue
 *         title:
 *           type: string
 *           description: The title of the issue
 *         description:
 *           type: string
 *           description: The short description of the issue
 *         order:
 *           type: number
 *           description: The order of the issue
 *         key:
 *           type: string
 *           description: The unique search key for the issue
 *         assignee:
 *           type: array
 *           description: The list of users assigned to the issue
 *           items:
 *              type: string
 *              description: The id of the assigned user
 *         isDone:
 *           type: boolean
 *           description: The flag to check if the issue is done or not
 */

const IssueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Number,
  },
  order: {
    type: Number,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  assignee: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('issue', IssueSchema);
