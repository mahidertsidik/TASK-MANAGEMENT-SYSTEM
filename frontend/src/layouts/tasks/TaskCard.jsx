import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import NotificationBell from '../../components/NotificationBell';
import './tasks.css';

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div className="task-card">
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-actions">
                    <NotificationBell taskId={task._id} />
                    <button onClick={() => onEdit(task)} className="edit-btn">
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="delete-btn">
                        <FaTrash />
                    </button>
                </div>
            </div>
            <p className="task-desc">{task.description}</p>
            <div className="task-footer">
                <span className={`tag-text ${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
                <span className="created">
                    Due: {new Date(task.deadline).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default TaskCard; 
