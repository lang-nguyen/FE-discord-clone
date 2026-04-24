import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from './useSocket';
import { addMessage } from '../../store/slices/chatSlice';
import { useEffect } from 'react';

export const useChat = () => {
    const dispatch = useDispatch();
    const { socket } = useSocket();
    const messages = useSelector((state) => state.chat.messages);
    const currentUser = useSelector((state) => state.chat.currentUser);

    // 1. Logic Gửi Tin Nhắn
    const sendMessage = (content) => {
        if (!content.trim()) return;

        const newMessage = {
            id: Date.now().toString(), // ID tạm
            content,
            sender: currentUser,
            timestamp: new Date().toISOString(),
        };

        // 1.1 Optimistic Update: Hiện ngay lên UI
        dispatch(addMessage(newMessage));

        // 1.2 Gửi qua Socket
        if (socket) {
            socket.emit('send_message', newMessage);
        }
    };

    // 2. Logic Nhận Tin Nhắn
    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (msg) => {
            // Kiểm tra xem tin nhắn này có phải do mình gửi không (để tránh duplicate nếu server broadcast lại cho sender)
            if (msg.sender.id !== currentUser.id) {
                dispatch(addMessage(msg));
            }
        };

        // Đăng ký sự kiện 'new_message' từ server
        socket.on('new_message', handleNewMessage);

        return () => {
            socket.off('new_message', handleNewMessage);
        };
    }, [socket, dispatch, currentUser.id]);

    return {
        messages,
        sendMessage,
    };
};
