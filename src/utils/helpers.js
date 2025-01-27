export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
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
    });
};

export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}; 