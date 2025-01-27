import React from 'react';
import { formatDate } from '../../../utils/helpers';
import EditButton from '../../common/EditButton';

// Add these icon components at the top of the file
const CalendarIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DeleteButton = ({ onClick }) => (
  <button onClick={onClick} className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  </button>
);

const PriorityBadge = ({ priority }) => (
  <span className={`px-3 py-1 text-sm rounded-full ${
    priority === 'high' ? 'bg-red-100 text-red-700' :
    priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
    'bg-green-100 text-green-700'
  }`}>
    {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
  </span>
);

function TaskCard({ task, onToggle, onDelete, onEdit, onViewDetails }) {
  const getPriorityStyles = (priority) => {
    const styles = {
      high: 'border-red-500 bg-red-50',
      medium: 'border-yellow-500 bg-yellow-50',
      low: 'border-green-500 bg-green-50'
    };
    return styles[priority] || styles.medium;
  };

  return (
    <div 
      className={`group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
        getPriorityStyles(task.priority)
      } ${task.completed ? 'opacity-75' : ''}`}
      onClick={() => onViewDetails(task)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
        />
        
        <div className="flex-grow">
          <h3 className={`text-lg font-medium text-gray-800 ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>
          
          <div className="flex flex-wrap gap-3 mt-2">
            {task.dueDate && (
              <span className="inline-flex items-center text-sm text-gray-600">
                <CalendarIcon />
                {formatDate(task.dueDate)}
              </span>
            )}
            
            {task.category && (
              <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                {task.category}
              </span>
            )}
            
            <PriorityBadge priority={task.priority} />
          </div>
        </div>
        
        <div className="flex">
          <EditButton onClick={() => onEdit(task)} />
          <DeleteButton onClick={() => onDelete(task.id)} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard; 