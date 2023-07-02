import { configureStore, combineReducers } from '@reduxjs/toolkit';
import homeScreenReducer from '../features/homeScreen/HomeScreenSlice'

const rootreducer = combineReducers({
  homeScreen: homeScreenReducer,
})
export const store = configureStore({
  reducer: rootreducer
});
