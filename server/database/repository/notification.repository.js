/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const NotificationModel = require('../models/notification.model');

class ProjectRepository {
  async findNotifications({ userId }) {
    return NotificationModel.find({ userId });
  }

  async createNotification({
    userId,body
  }) {
    const notification = new NotificationModel({
      userId,body
    });
    return notification.save();
  }

  
}

module.exports = ProjectRepository;
