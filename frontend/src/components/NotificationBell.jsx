import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import './NotificationBell.css';

const NotificationBell = ({ taskId }) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchNotifications();
        // Set up polling for new notifications
        const interval = setInterval(fetchNotifications, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, [taskId]);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/notifications/task/${taskId}/unread`);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`http://localhost:5000/api/notifications/task/${taskId}/notification/${notificationId}/read`);
            fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className="notification-bell">
            <div className="bell-icon" onClick={() => setIsOpen(!isOpen)}>
                <FaBell />
                {notifications.length > 0 && (
                    <span className="notification-badge">{notifications.length}</span>
                )}
            </div>
            {isOpen && (
                <div className="notification-dropdown">
                    {notifications.length === 0 ? (
                        <div className="no-notifications">No new notifications</div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className="notification-item"
                                onClick={() => markAsRead(notification._id)}
                            >
                                <p>{notification.message}</p>
                                <small>{new Date(notification.createdAt).toLocaleString()}</small>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell; 