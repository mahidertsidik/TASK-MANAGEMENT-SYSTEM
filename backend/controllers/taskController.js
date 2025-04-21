const Task = require('../models/task');
const NotificationService = require('../services/notificationService');

const taskController = {
    async createTask(req, res) {
        try {
            const task = new Task(req.body);
            await task.save();

            // Create notification for task assignment
            if (task.assignedTo) {
                await NotificationService.createNotification(
                    task._id,
                    'assignment',
                    `You have been assigned to task: ${task.title}`
                );
            }

            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async updateTask(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            const oldStatus = task.status;
            const oldAssignee = task.assignedTo;

            Object.assign(task, req.body);
            await task.save();

            // Create notification for status change
            if (oldStatus !== task.status) {
                await NotificationService.createNotification(
                    task._id,
                    'status_change',
                    `Task "${task.title}" status changed from ${oldStatus} to ${task.status}`
                );
            }

            // Create notification for assignment change
            if (oldAssignee?.toString() !== task.assignedTo?.toString()) {
                await NotificationService.createNotification(
                    task._id,
                    'assignment',
                    `You have been assigned to task: ${task.title}`
                );
            }

            res.json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteTask(req, res) {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getTasks(req, res) {
        try {
            const tasks = await Task.find()
                .populate('assignedTo')
                .populate('project');
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getTaskById(req, res) {
        try {
            const task = await Task.findById(req.params.id)
                .populate('assignedTo')
                .populate('project');
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = taskController; 