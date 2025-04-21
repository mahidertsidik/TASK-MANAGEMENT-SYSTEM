import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';

// Routes Imports
import authRoute from './routes/auth.js';
import dashboardRoute from './routes/dashboard.js';
import employeeRoutes from './routes/employees.js';
import projectRoute from './routes/project.js';
import taskRoute from './routes/task.js';
import timesheetRoute from './routes/timesheet.js';
import attendanceRoute from './routes/attendance.js';
import notificationRoutes from './routes/notifications.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(morgan('dev')); // HTTP request logger
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', projectRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/timesheets', timesheetRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
