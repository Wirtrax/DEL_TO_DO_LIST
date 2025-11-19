import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/rootReducer';
const rootReducer = {};
export const store = configureStore({
  reducer: rootReducer,
});
