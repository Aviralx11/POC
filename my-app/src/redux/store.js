import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, //reducer which recieves the dispatch (store passes the action and current state to the authReducer)
  },
});
