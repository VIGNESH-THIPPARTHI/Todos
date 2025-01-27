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

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask
  };
} 