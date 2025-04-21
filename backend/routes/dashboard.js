import express from 'express';
import Project from '../models/projects.js';
import Task from '../models/tasks.js';
import Employee from '../models/employees.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const stats = {
            totalProjects: await Project.countDocuments(),
            totalTasks: await Task.countDocuments(),
            totalEmployees: await Employee.countDocuments(),
            activeProjects: await Project.countDocuments({ status: 'active' }),
            completedTasks: await Task.countDocuments({ status: 'completed' })
        };
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;