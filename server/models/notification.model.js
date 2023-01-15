const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - notifyeeId
 *         - notificationBody
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the activity
 *         notifyeeId:
 *           type: string
 *           description: The id of the user who should be notified
 *         notificationBody:
 *           type: string
 *           description: The body of the notification
 *         timestamp:
 *           type: datetime
 *           description: The time of notification posted
 */

const NotificationSchema = new Schema({
  notifyeeId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  notificationBody: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('notification', NotificationSchema);
