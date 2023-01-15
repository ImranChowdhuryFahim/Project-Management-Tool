const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       required:
 *         - title
 *         - order
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the list
 *         title:
 *           type: string
 *           description: The title of the list
 *         order:
 *           type: number
 *           description: The order number of the list(to sort the list view)
 *         issues:
 *           type: array
 *           description: The list of issues added to the list
 *           items:
 *              type: string
 *              description: The id of the issue
 */

const ListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  issues: [{ type: mongoose.Types.ObjectId, ref: 'issue' }],
});

module.exports = mongoose.model('list', ListSchema);
