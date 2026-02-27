import { createSlice } from '@reduxjs/toolkit';
import { DUMMY_MESSAGES, DUMMY_CHANNELS, DUMMY_SERVERS } from '../../mock/data';

// 1. Initial State (Trạng thái ban đầu)
const initialState = {
    servers: DUMMY_SERVERS,
    channels: DUMMY_CHANNELS,
    messages: DUMMY_MESSAGES,
    activeServerId: 'server-1',
    activeChannelId: 'channel-1',
    currentUser: {
        id: 'me',
        username: 'Me',
        avatar: 'https://ui-avatars.com/api/?name=Me',
    },
};

// 2. Create Slice
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // Action: Thêm tin nhắn mới (Optimistic)
        sendMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        // Action: Nhận từ socket
        receiveMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        // Action: Chuyển kênh
        setActiveChannel: (state, action) => {
            state.activeChannelId = action.payload;
        },
    },
});

// 3. Export Actions & Reducer
export const { sendMessage, receiveMessage, setActiveChannel } = chatSlice.actions;
export default chatSlice.reducer;
