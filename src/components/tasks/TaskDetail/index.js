import React from 'react';
import { formatDate } from '../../../utils/helpers';

function TaskDetail({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white/95 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {task.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Created {formatDate(task.createdAt)}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Priority Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              task.completed 
                ? 'bg-green-100 text-green-700 ring-1 ring-green-700/10' 
                : 'bg-blue-100 text-blue-700 ring-1 ring-blue-700/10'
            }`}>
              {task.completed ? '✓ Completed' : '⧖ Active'}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              task.priority === 'high' 
                ? 'bg-red-100 text-red-700 ring-1 ring-red-700/10' 
                : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-700/10'
                : 'bg-green-100 text-green-700 ring-1 ring-green-700/10'
            }`}>
              {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {' '}
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            {task.category && (
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 ring-1 ring-gray-700/10">
                📁 {task.category}
              </span>
            )}
          </div>

          {/* Description Section */}
          {task.description && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Description
              </h3>
              <p className="text-gray-600 whitespace-pre-line break-words leading-relaxed">
                {task.description}
              </p>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {task.dueDate && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Due Date
                </h3>
                <p className="text-blue-700 font-medium">
                  {formatDate(task.dueDate)}
                </p>
              </div>
            )}
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Status
              </h3>
              <div className="space-y-1">
                <p className="text-indigo-700 font-medium">
                  {task.completed ? 'Completed' : 'In Progress'}
                </p>
                {task.completed && (
                  <p className="text-sm text-indigo-600">
                    Task completed successfully
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail; 