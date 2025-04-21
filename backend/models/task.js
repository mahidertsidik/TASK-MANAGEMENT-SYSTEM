import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Most Important'],  // Added 'Most Important' to the enum here
    default: 'Low'  // Optional: You can set a default value here
  },
  notifications: [notificationSchema]
}, {
  timestamps: true
});

// Only create the model if it doesn't already exist in mongoose.models
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
