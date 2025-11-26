import { Tasks } from 'types/tasks';

interface SortingState {
  searchTerm: string;
  sortBy: 'isCompleted' | 'isImport' | '';
}

export const getSortedTasks = (tasks: Tasks, sorting: SortingState): Tasks => {
  let filteredTasks = tasks;

  if (sorting.searchTerm) {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.name?.toLowerCase().includes(sorting.searchTerm.toLowerCase()) ||
        task.info?.toLowerCase().includes(sorting.searchTerm.toLowerCase())
    );
  }

  if (sorting.sortBy) {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (sorting.sortBy === 'isCompleted') {
        return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1;
      }
      if (sorting.sortBy === 'isImport') {
        return a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1;
      }
      return 0;
    });
  }

  return filteredTasks;
};
