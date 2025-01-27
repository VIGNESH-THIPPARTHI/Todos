import React from 'react';
import TaskCard from '../TaskCard';
import { TASK_FILTERS } from '../../../utils/constants';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask, onViewDetails, onClearTasks, filter }) {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filter === TASK_FILTERS.ACTIVE && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Active Tasks ({activeTasks.length})
            </h2>
            {activeTasks.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => onClearTasks('active')}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  Clear Active Tasks
                </button>
                <button
                  onClick={() => onClearTasks('markAllCompleted')}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                >
                  Mark All Completed
                </button>
              </div>
            )}
          </div>
          {activeTasks.length > 0 ? (
            activeTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No active tasks</p>
          )}
        </div>
      )}

      {filter === TASK_FILTERS.COMPLETED && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Completed Tasks ({completedTasks.length})
            </h2>
            {completedTasks.length > 0 && (
              <button
                onClick={() => onClearTasks('completed')}
                className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                Clear Completed Tasks
              </button>
            )}
          </div>
          {completedTasks.length > 0 ? (
            completedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No completed tasks</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskList; 