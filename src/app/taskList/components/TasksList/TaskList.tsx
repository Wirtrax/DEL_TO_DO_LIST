import { useEffect, useState } from 'react';
import styles from './TasksListStyle.module.css';
import CustomLink from 'components/CustomLink/CustomLink';
import { SearchInput } from 'components/SearchInput';
import { useTasks } from 'src/hooks/useTasks';
import TasksContainer from 'components/TasksContainer/TasksContainer';
import TaskHolder from 'components/TasksContainer/TaskHolder/TaskHolder';
import { Task } from 'types/tasks';
import Dropdown from 'components/Dropdown/Dropdown';
import Notification from 'components/Notification/Notification';
import { useRouteState } from 'src/hooks/useRouteState';
import { Inotification } from 'types/notification';
import { useSorting } from 'src/hooks/useSorting';
import { getSortedTasks } from 'src/utils/taskSorting';

function TaskList() {
  const { historyState, clearHistoryState } = useRouteState();
  const [notification, setNotification] = useState<Inotification | null>(null);
  const { tasks, getTasks, deleteTask, updateTask } = useTasks();
  const { sorting, setSearchTerm, setSortBy } = useSorting();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    if (historyState?.fromCreate) {
      const newNotification: Inotification = {
        show: true,
        type: historyState.success ? 'success' : 'error',
        message: historyState.message || '',
      };

      setNotification(newNotification);
      clearHistoryState();
    }
  }, []);

  useEffect(() => {
    if (notification?.show) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setNotification({
        show: true,
        type: 'success',
        message: 'Task deleted successfully',
      });
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Failed to delete task',
      });
    }
  };

  const handleCompletedTask = async (id: number, data: Task) => {
    const newCompletedState = !data.isCompleted;
    try {
      await updateTask(id, { isCompleted: newCompletedState });
      setNotification({
        show: true,
        type: 'success',
        message: 'Task completed successfully',
      });
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Failed to update task',
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as 'isCompleted' | 'isImport' | '');
  };

  const sortedTasks = getSortedTasks(tasks, sorting);

  return (
    <div>
      <h1 className={styles.title}>TODO LIST</h1>
      <div className={styles.toolbar}>
        <Dropdown value={sorting.sortBy} onChange={handleSortChange} />
        <div>
          <SearchInput value={sorting.searchTerm} onChange={handleSearchChange} onReset={() => setSearchTerm('')} />
        </div>
      </div>
      <TasksContainer>
        {sortedTasks.map((task) => {
          if (!task.id || !task.info || !task.name) {
            return null;
          }

          return (
            <TaskHolder
              key={task.id}
              label={task.info}
              idTasks={task.id}
              taskName={task.name}
              complete={task.isCompleted}
              onDelete={handleDeleteTask}
              onCompleted={handleCompletedTask}
            />
          );
        })}
      </TasksContainer>
      <CustomLink to="/create" label="New Task" fullWidth={true} />
      {notification && <Notification label={notification.message} status={notification.type} />}
    </div>
  );
}

export default TaskList;
