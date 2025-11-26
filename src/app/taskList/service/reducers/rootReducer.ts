import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './TasksSlice';
import sortingReducer from './filtersSlice';
export const rootReducer = combineReducers({
  task: taskReducer,
  sorting: sortingReducer,
});
