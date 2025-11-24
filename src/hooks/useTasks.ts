import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { addTask, getAllTask, updateTaskById, removeTask } from 'app/taskList/service/thunks/taskThunks';
import { CreateTask, Task } from 'types/tasks';

export const useTasks = () => {
  const dispatch = useAppDispatch();

  const { tasks, isLoading, error, currentTask } = useAppSelector((state) => state.taskReducer);

  const getTasks = useCallback(() => {
    dispatch(getAllTask());
  }, [dispatch]);

  const createTask = useCallback(
    (taskData: CreateTask) => {
      return dispatch(addTask(taskData));
    },
    [dispatch]
  );
  const updateTask = useCallback(
    (id: number, data: Partial<Task>) => {
      return dispatch(updateTaskById({ id, data }));
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id: number) => {
      return dispatch(removeTask(id));
    },
    [dispatch]
  );

  return {
    tasks,
    isLoading,
    error,
    currentTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
