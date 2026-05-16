import { createContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export const SocketContext = createContext({
    socket: null,
    isConnected: false,
});

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_API_URL || 'https://localhost:7150'}/hubs/messages`, {
                // Tắt comment dòng dưới nếu gặp lỗi CORS policy (nếu BE không có auth cookie)
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect() // Tự động kết nối lại khi rớt mạng
            .build();


        setSocket(connection);

        // Khởi động kết nối
        connection.start()
            .then(() => {
                console.log('SignalR connected:', connection.connectionId);
                setIsConnected(true);
            })
            .catch(err => {
                console.error('SignalR connection failed: ', err);
                setIsConnected(false);
            });

        // Lắng nghe sự kiện ngắt kết nối
        connection.onclose(() => {
            console.log('SignalR disconnected');
            setIsConnected(false);
        });

        // Lắng nghe sự kiện kết nối lại thành công sau khi rớt mạng
        connection.onreconnected(connectionId => {
            console.log('SignalR reconnected:', connectionId);
            setIsConnected(true);
        });

        return () => {
            connection.stop();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
