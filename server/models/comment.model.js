const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - text
 *         - sender
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the comment
 *         text:
 *           type: string
 *           description: The text of the comment
 *         sender:
 *           type: string
 *           description: The id of the user who added the comment
 */

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('comment', CommentSchema);
