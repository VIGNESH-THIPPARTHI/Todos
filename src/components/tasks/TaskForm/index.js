import React, { useState, useEffect } from 'react';
import { getTodayDate } from '../../../utils/helpers';

function TaskForm({ onAddTask, editingTask, onUpdateTask }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(getTodayDate());
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setDueDate(editingTask.dueDate || getTodayDate());
      setPriority(editingTask.priority);
      setCategory(editingTask.category || '');
      setIsExpanded(true);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !priority) return;

    const taskData = {
      title,
      description,
      dueDate,
      priority,
      category,
    };

    if (editingTask) {
      onUpdateTask({ ...taskData, id: editingTask.id, completed: editingTask.completed });
    } else {
      onAddTask({ ...taskData, createdAt: new Date().toISOString() });
    }

    setTitle('');
    setDescription('');
    setDueDate(getTodayDate());
    setPriority('');
    setCategory('');
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <svg 
            className={`w-5 h-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-lg font-medium text-gray-800">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {isExpanded ? 'Click to collapse' : 'Click to expand'}
        </span>
      </button>

      {/* Collapsible Form */}
      {isExpanded && (
        <form 
          className="px-4 sm:px-6 pb-6 space-y-4 border-t border-gray-100"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/95"
              required
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/95"
            />
          </div>

          <div className="mt-3 sm:mt-4">
            <textarea
              placeholder="Add description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/95 min-h-[100px] resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/95 appearance-none"
                required
              >
                <option value="" disabled>Priority Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              placeholder="Category (e.g., Work, Personal, Shopping)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/95"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      )}
    </div>
  );
}

export default TaskForm; 