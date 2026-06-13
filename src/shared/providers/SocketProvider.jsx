import { createContext, useEffect, useMemo, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useSelector } from "react-redux";
import { getStoredAccessToken } from "@/features/auth/utils/authStorage";

export const SocketContext = createContext({
  connection: null,
  isConnected: false,
});

export const SocketProvider = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [connection, setConnection] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL;
    if (!wsUrl || !accessToken) return undefined;

    const nextConnection = new signalR.HubConnectionBuilder()
      .withUrl(wsUrl, {
        accessTokenFactory: () => getStoredAccessToken() || "",
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.None)
      .build();

    setConnection(nextConnection);
    nextConnection.onclose(() => {
      setIsConnected(false);
    });
    nextConnection.onreconnecting(() => setIsConnected(false));
    nextConnection.onreconnected(() => {
      setIsConnected(true);
    });

    let disposed = false;
    nextConnection
      .start()
      .then(() => {
        if (!disposed) setIsConnected(true);
      })
      .catch(() => {
        if (!disposed) setIsConnected(false);
      });

    return () => {
      disposed = true;
      setIsConnected(false);
      setConnection(null);
      nextConnection.stop();
    };
  }, [accessToken]);

  const value = useMemo(
    () => ({
      connection,
      isConnected,
      invoke: (method, ...args) => connection?.invoke(method, ...args),
      subscribe: (event, handler) => {
        connection?.on(event, handler);
        return () => connection?.off(event, handler);
      },
    }),
    [connection, isConnected]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
