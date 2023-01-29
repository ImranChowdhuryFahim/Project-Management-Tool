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
 *         notifyeeId:
 *           type: string
 *         notificationBody:
 *           type: string
 *         createdAt:
 *           type: datetime
 *         updatedAt:
 *           type: datetime
 */

const NotificationSchema = new Schema({
  notifyeeId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  notificationBody: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('notification', NotificationSchema);
