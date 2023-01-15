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
 *         key:
 *           type: string
 *           description: The unique search key for the issue
 *         assignee:
 *           type: array
 *           description: The list of users assigned to the issue
 *           items:
 *              type: string
 *              description: The id of the assigned user
 *         comments:
 *           type: array
 *           description: The list of comments added to the issue
 *           items:
 *              type: string
 *              description: The id of the comment
 */

const IssueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Number,
  },
  key: {
    type: String,
    required: true,
  },
  assignee: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
});

module.exports = mongoose.model('issue', IssueSchema);
