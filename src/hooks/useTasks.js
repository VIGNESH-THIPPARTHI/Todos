import { useState, useEffect } from 'react';

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { 
      ...task, 
      id: Date.now(), 
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(currentTasks => [newTask, ...currentTasks]);
  };

  const toggleTask = (taskId) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
  };

  const updateTask = (updatedTask) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const clearTasks = (status) => {
    setTasks(currentTasks => {
      if (status === 'completed') {
        // Delete completed tasks
        return currentTasks.filter(task => !task.completed);
      } else if (status === 'active') {
        // Delete active tasks
        return currentTasks.filter(task => task.completed);
      } else if (status === 'markAllCompleted') {
        // Mark all active tasks as completed
        return currentTasks.map(task => 
          !task.completed ? { ...task, completed: true } : task
        );
      }
      return currentTasks;
    });
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearTasks
  };
} 