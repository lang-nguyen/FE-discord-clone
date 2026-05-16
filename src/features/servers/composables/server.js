import { useState, useCallback } from "react";
import { serverApi } from "@/features/servers/api/server.api";

/**
 * Composable quản lý hành vi server:
 * - Lấy thông tin server
 * - Xóa server
 */
export function useServer({ serverName: initialServerName, onClose }) {
  const [serverName] = useState(initialServerName || "");

  const fetchServer = useCallback(async () => {
    try {
      const data = await serverApi.getServer(serverName);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [serverName]);

  const deleteServer = useCallback(async () => {
    try {
      await serverApi.deleteServer(serverName);
      console.log("Server deleted:", serverName);
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
    }
  }, [serverName, onClose]);

  return {
    serverName,
    fetchServer,
    deleteServer,
  };
}
