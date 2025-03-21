import React, { useState } from 'react';
import Header from './components/layout/Header';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';
import { useTasks } from './hooks/useTasks';
import { filterTasks } from './utils/helpers';
import { TASK_FILTERS } from './utils/constants';
import TaskDetail from './components/tasks/TaskDetail';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask, clearTasks } = useTasks();
  const [filter, setFilter] = useState(TASK_FILTERS.ACTIVE);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(true);

  const filteredTasks = filterTasks(tasks, filter, searchTerm);

  const handleAddTask = (task) => {
    addTask(task);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (updatedTask) => {
    updateTask(updatedTask);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 sm:py-8 px-3 sm:px-4 antialiased">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <Header 
          filter={filter} 
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddNewClick={() => setShowTaskForm(true)}
        />
        {showTaskForm && (
          <TaskForm 
            onAddTask={handleAddTask} 
            editingTask={editingTask}
            onUpdateTask={handleUpdate}
            onClose={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
        <TaskList 
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={handleEdit}
          onViewDetails={setSelectedTask}
          onClearTasks={clearTasks}
          filter={filter}
        />
      </div>
      
      {selectedTask && (
        <TaskDetail 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </div>
  );
}

export default App;
