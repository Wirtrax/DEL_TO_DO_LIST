import axios from 'axios';
import { Task, Tasks, CreateTask, UpdateTask } from '../types/tasks';
import { apiClient } from './utils/requestAgent';

export const getTasks = async (): Promise<Tasks> => {
  const response = await apiClient.get<Tasks>('/tasks');
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await apiClient.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: CreateTask): Promise<Task> => {
  const response = await apiClient.post<Task>('/tasks', taskData);
  return response.data;
};

export const updateTasks = async (id: string, taskData: UpdateTask): Promise<Task> => {
  const response = await apiClient.patch<Task>(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: number): Promise<number> => {
  const response = await apiClient.delete(`/tasks/${id}`);

  if (response.status >= 200 && response.status < 300) {
    return id;
  } else {
    throw new Error(`Delete failed with status: ${response.status}`);
  }
};
