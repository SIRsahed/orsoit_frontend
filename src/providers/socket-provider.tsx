"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
  sendMessage: (data: {
    roomId: string;
    userId: string;
    message: string;
    attachmentFile?: string;
  }) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinRoom: () => {},
  sendMessage: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;

    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [session]);

  const joinRoom = (roomId: string) => {
    if (socket && isConnected) {
      socket.emit("joinRoom", roomId);
      console.log(`Joined room: ${roomId}`);
    }
  };

  const sendMessage = (data: {
    roomId: string;
    userId: string;
    message: string;
    attachmentFile?: string;
  }) => {
    if (socket && isConnected) {
      socket.emit("sendMessage", data);
      console.log("Message sent:", data);
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, joinRoom, sendMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};
