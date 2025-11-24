import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './TasksSlice';
export const rootReducer = combineReducers({
  taskReducer,
});
