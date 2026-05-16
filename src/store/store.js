import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import { inviteApi } from '../api/inviteApi';
import { roleApi } from '../api/roleApi';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    [inviteApi.reducerPath]: inviteApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inviteApi.middleware, roleApi.middleware),
});

export default store;
