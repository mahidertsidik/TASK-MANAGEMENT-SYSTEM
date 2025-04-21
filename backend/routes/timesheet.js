import express from 'express';
import Timesheet from '../models/timesheets.js';

const router = express.Router();

// Get all timesheets
router.get('/', async (req, res) => {
    try {
        const timesheets = await Timesheet.find()
            .populate('employee project task');
        res.json(timesheets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single timesheet
router.get('/:id', async (req, res) => {
    try {
        const timesheet = await Timesheet.findById(req.params.id)
            .populate('employee project task');
        if (!timesheet) {
            return res.status(404).json({ message: 'Timesheet not found' });
        }
        res.json(timesheet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create timesheet
router.post('/', async (req, res) => {
    try {
        const timesheet = new Timesheet(req.body);
        const savedTimesheet = await timesheet.save();
        res.status(201).json(savedTimesheet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update timesheet
router.put('/:id', async (req, res) => {
    try {
        const timesheet = await Timesheet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('employee project task');
        
        if (!timesheet) {
            return res.status(404).json({ message: 'Timesheet not found' });
        }
        res.json(timesheet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete timesheet
router.delete('/:id', async (req, res) => {
    try {
        const timesheet = await Timesheet.findByIdAndDelete(req.params.id);
        if (!timesheet) {
            return res.status(404).json({ message: 'Timesheet not found' });
        }
        res.json({ message: 'Timesheet deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;