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
  <button 
    onClick={onClick} 
    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
    title="Delete task"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  </button>
);

function TaskCard({ task, onToggle, onDelete, onEdit, onViewDetails }) {
  const getPriorityStyles = (priority) => {
    const styles = {
      high: 'border-l-4 border-red-500 bg-red-50/80',    // Lighter red background
      medium: 'border-l-4 border-amber-500 bg-amber-50/80', // Using amber for better yellow
      low: 'border-l-4 border-emerald-500 bg-emerald-50/80' // Using emerald for better green
    };
    return styles[priority] || styles.medium;
  };

  const getPriorityBadgeStyles = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-800 ring-1 ring-red-600/20',      // Darker text for better contrast
      medium: 'bg-amber-100 text-amber-800 ring-1 ring-amber-600/20', // Amber for better yellow
      low: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-600/20' // Emerald for better green
    };
    return styles[priority] || styles.medium;
  };

  return (
    <div 
      className={`group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
        getPriorityStyles(task.priority)
      } ${task.completed ? 'opacity-75' : ''}`}
      onClick={() => onViewDetails(task)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-4">
        <div className="relative group/checkbox pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Tooltip */}
          <div className="absolute left-7 top-0 hidden group-hover/checkbox:block">
            <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {task.completed ? 'Mark as active' : 'Mark as completed'}
            </div>
          </div>
          {/* Status Change Animation */}
          {task.completed && (
            <svg 
              className="absolute -top-1 -right-1 w-3 h-3 text-green-500 animate-ping"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <circle cx="10" cy="10" r="10" />
            </svg>
          )}
        </div>
        
        <div className="flex-grow min-w-0">
          <h3 className={`text-lg font-medium text-gray-800 truncate ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {task.dueDate && (
              <span className="inline-flex items-center text-sm text-gray-600 shrink-0">
                <CalendarIcon />
                {formatDate(task.dueDate)}
              </span>
            )}
            
            {task.category && (
              <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 truncate max-w-[200px]">
                {task.category}
              </span>
            )}
            
            <span className={`px-3 py-1 text-sm font-medium rounded-full shrink-0 ${
              getPriorityBadgeStyles(task.priority)
            }`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
          </div>
        </div>
        
        <div className="flex shrink-0 ml-2">
          <EditButton onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }} />
          <DeleteButton onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard; 