import React from 'react';
import TaskCard from '../TaskCard';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask, onViewDetails }) {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onViewDetails={onViewDetails}
        />
      ))}
      
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
}

export default TaskList; 