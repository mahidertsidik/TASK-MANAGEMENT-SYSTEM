import Task from '../models/task.js';

class NotificationService {
    static async createNotification(taskId, type, message) {
        try {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            task.notifications.push({
                type,
                message,
                isRead: false
            });

            await task.save();
            return task;
        } catch (error) {
            throw error;
        }
    }

    static async markNotificationAsRead(taskId, notificationId) {
        try {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            const notification = task.notifications.id(notificationId);
            if (!notification) {
                throw new Error('Notification not found');
            }

            notification.isRead = true;
            await task.save();
            return task;
        } catch (error) {
            throw error;
        }
    }

    static async getUnreadNotifications(taskId) {
        try {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            return task.notifications.filter(notification => !notification.isRead);
        } catch (error) {
            throw error;
        }
    }

    static async checkDeadlines() {
        try {
            const today = new Date();
            const tasks = await Task.find({
                deadline: {
                    $gte: today,
                    $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Next 24 hours
                },
                status: { $ne: 'Completed' }
            });

            for (const task of tasks) {
                await this.createNotification(
                    task._id,
                    'deadline',
                    `Task "${task.title}" is due in 24 hours!`
                );
            }
        } catch (error) {
            console.error('Error checking deadlines:', error);
        }
    }
}

export default NotificationService;
