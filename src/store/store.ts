import { configureStore } from '@reduxjs/toolkit';
import botReducer from '../features/bot/botSlice';

export const store = configureStore({
  reducer: {
    bot: botReducer,
  },
});