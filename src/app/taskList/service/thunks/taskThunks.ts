import { createAsyncThunk } from '@reduxjs/toolkit';
import { createTask, deleteTask, getTaskById, getTasks, updateTasks } from 'api/api';
import { CreateTask, UpdateTask } from 'types/tasks';

export const getAllTask = createAsyncThunk('tasks/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await getTasks();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getAloneTask = createAsyncThunk('tasks/fetchOne', async (id: string, { rejectWithValue }) => {
  try {
    return await getTaskById(id);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addTask = createAsyncThunk('tasks/create', async (data: CreateTask, { rejectWithValue }) => {
  try {
    return await createTask(data);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const updateTaskById = createAsyncThunk(
  'tasks/update',
  async ({ id, data }: { id: number; data: UpdateTask }, { rejectWithValue }) => {
    try {
      return await updateTasks(String(id), data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeTask = createAsyncThunk('tasks/remove', async (id: number, { rejectWithValue }) => {
  try {
    await deleteTask(id);
    return id;
  } catch (error) {
    return rejectWithValue(error);
  }
});
