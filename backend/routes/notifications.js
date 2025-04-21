import express from 'express';
import notificationController from '../controllers/notificationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/task/:taskId/unread', auth, notificationController.getUnreadNotifications);
router.put('/task/:taskId/notification/:notificationId/read', auth, notificationController.markAsRead);

export default router;
