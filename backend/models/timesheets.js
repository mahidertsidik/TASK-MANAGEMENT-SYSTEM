import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
    notes: {
        type: String,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    },
    timeSpent: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: ['Development', 'Testing', 'Other'],
        required: true,
    },
    hoursWorked: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

const Timesheet = mongoose.model('Timesheet', timesheetSchema);
export default Timesheet;
