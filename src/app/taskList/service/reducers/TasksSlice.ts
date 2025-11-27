import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTask, getAllTask, updateTaskById, removeTask, getAloneTask } from '../thunks/taskThunks';
import { errorTask, Tasks, Task } from 'types/tasks';

interface TaskState {
  tasks: Tasks;
  isLoading: boolean;
  error: errorTask;
  currentTask: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: {},
  currentTask: null,
};

export const TasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    const handlePending = (state: TaskState) => {
      state.isLoading = true;
    };

    const handleRejected = (state: TaskState, action: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.error = action.payload as errorTask;
    };

    builder
      .addCase(getAllTask.pending, handlePending)
      .addCase(getAllTask.fulfilled, (state: TaskState, action: PayloadAction<Tasks>) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.error = {};
      })
      .addCase(getAllTask.rejected, handleRejected)

      .addCase(getAloneTask.pending, handlePending)
      .addCase(getAloneTask.fulfilled, (state: TaskState, action: PayloadAction<Task>) => {
        state.isLoading = false;
        state.currentTask = action.payload;
        state.error = {};
      })
      .addCase(getAloneTask.rejected, handleRejected)

      .addCase(addTask.pending, handlePending)
      .addCase(addTask.fulfilled, (state: TaskState, action: PayloadAction<Task>) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
        state.error = {};
      })
      .addCase(addTask.rejected, handleRejected)

      .addCase(updateTaskById.pending, handlePending)
      .addCase(updateTaskById.fulfilled, (state: TaskState, action: PayloadAction<Task>) => {
        state.isLoading = false;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskById.rejected, handleRejected)

      .addCase(removeTask.pending, handlePending)
      .addCase(removeTask.fulfilled, (state: TaskState, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(removeTask.rejected, handleRejected);
  },
});

export default TasksSlice.reducer;
