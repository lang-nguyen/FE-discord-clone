import { useState, useCallback } from "react";

/**
 * Composable quản lý hành vi server:
 * - Lấy thông tin server
 * - Xóa server
 */
export function useServer({ serverName: initialServerName, onClose }) {
  const [serverName] = useState(initialServerName || "");

  const fetchServer = useCallback(async () => {
    // TODO: Call API to fetch server info
    // const response = await api.get(`/servers/${serverId}`);
    // return response.data;
  }, []);

  const deleteServer = useCallback(async () => {
    // TODO: Call API to delete server
    // await api.delete(`/servers/${serverId}`);
    console.log("Server deleted:", serverName);
    if (onClose) onClose();
  }, [serverName, onClose]);

  return {
    serverName,
    fetchServer,
    deleteServer,
  };
}
