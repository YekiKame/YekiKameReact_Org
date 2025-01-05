import { configureStore } from '@reduxjs/toolkit';
import createEventReducer from './slices/createEventSlice';

export const store = configureStore({
  reducer: {
    createEvent: createEventReducer, // اضافه کردن Reducer برای ایجاد رویداد
  },
});
