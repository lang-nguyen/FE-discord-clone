import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import { inviteApi } from '../api/inviteApi';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    [inviteApi.reducerPath]: inviteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inviteApi.middleware),
});

export default store;
