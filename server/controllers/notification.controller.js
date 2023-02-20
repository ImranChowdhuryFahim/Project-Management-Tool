const { NotificationRepository } = require('../database');

const notificationRepository = new NotificationRepository()

module.exports = {

  getNotifications: async (req, res) => {
    const { userId } = req.params;

    const notification = await notificationRepository.findNotifications({ userId });

    return res.status(200).json({ notification });
  },

};
