import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeScreenReducer from '../features/homeScreen/HomeScreenSlice';
import dragDropReducer from '../features/homeScreen/DragDropSlice';

const rootreducer = combineReducers({
  homeScreen: homeScreenReducer,
  dragDrop: dragDropReducer
})
export const store = configureStore({
  reducer: rootreducer
});
