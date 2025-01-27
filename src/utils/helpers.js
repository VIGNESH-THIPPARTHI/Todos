export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const PRIORITY_ORDER = {
  high: 1,
  medium: 2,
  low: 3
};

export const filterTasks = (tasks, filter, searchTerm) => {
  return tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      const formattedDueDate = task.dueDate ? formatDate(task.dueDate) : '';
      
      return (
        task.title.toLowerCase().includes(searchLower) ||
        (task.category && task.category.toLowerCase().includes(searchLower)) ||
        formattedDueDate.includes(searchLower)
      );
    })
    .sort((a, b) => {
      // First sort by priority
      const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // If same priority, sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}; 