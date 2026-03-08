import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // chat: chatReducer,
  },
});

export default store;
