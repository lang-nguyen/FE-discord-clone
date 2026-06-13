import { useContext } from "react";
import { SocketContext } from "@/shared/providers/SocketProvider";

export const useSocket = () => {
  return useContext(SocketContext);
};
