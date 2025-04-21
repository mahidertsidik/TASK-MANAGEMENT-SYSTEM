import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: { type: String, enum: ['active', 'completed', 'on-hold'], default: 'active' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
