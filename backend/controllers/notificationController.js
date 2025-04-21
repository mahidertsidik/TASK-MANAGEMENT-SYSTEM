import NotificationService from '../services/notificationService.js';

const notificationController = {
    async getUnreadNotifications(req, res) {
        try {
            const { taskId } = req.params;
            const notifications = await NotificationService.getUnreadNotifications(taskId);
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async markAsRead(req, res) {
        try {
            const { taskId, notificationId } = req.params;
            const task = await NotificationService.markNotificationAsRead(taskId, notificationId);
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default notificationController;
