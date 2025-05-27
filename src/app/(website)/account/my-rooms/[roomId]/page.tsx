"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Paperclip,
  Send,
  X,
  ChevronDown,
  Users,
  ArrowLeft,
} from "lucide-react";
import { io, type Socket } from "socket.io-client";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  userType: string;
  abator?: string;
}

interface Room {
  _id: string;
  userId: User;
  adminId: User;
  roomName: string;
  ticketId: string;
  roomStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  roomId: string;
  userId: User;
  message: string;
  attachmentFile?: string;
  createdAt: string;
  updatedAt: string;
}

export default function RoomChatPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const userId = session?.user?.id;
  const token = session?.user?.accessToken;

  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    if (!userId) return;

    const socketInstance = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socketInstance.on("error", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId]);

  // Join room and listen for messages
  useEffect(() => {
    if (!socket || !roomId) return;

    console.log("Joining room:", roomId);
    socket.emit("joinRoom", roomId);

    const handleReceiveMessage = (message: Message) => {
      console.log("Received message:", message);
      if (message.roomId === roomId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, roomId]);

  // Fetch room details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!token || !roomId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rooms/user?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        if (data.success) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const foundRoom = data.data.find((r: any) => r._id === roomId);
          if (foundRoom) {
            setRoom(foundRoom);
          } else {
            console.error("Room not found in user's rooms");
            // Don't redirect immediately, show an error message instead
          }
        } else {
          console.error("Failed to fetch rooms:", data.message);
          // Don't redirect immediately
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
        // Don't redirect immediately
      }
    };

    fetchRoomDetails();
  }, [roomId, token, router, userId]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!token || !roomId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/receive-message?roomId=${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        if (data.success) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [roomId, token]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      const scrollContainer =
        messagesEndRef.current.parentElement?.parentElement?.parentElement;
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Scroll to bottom when first loading messages
  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      const scrollContainer =
        messagesEndRef.current.parentElement?.parentElement?.parentElement;
      if (scrollContainer) {
        // Use a small timeout to ensure the DOM has updated
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 100);
      }
    }
  }, [messages.length]);

  // Add a timeout to set an error message if room isn't loaded after 5 seconds
  useEffect(() => {
    if (!room) {
      const timer = setTimeout(() => {
        setLoadingError(
          "Unable to load room. The room may not exist or you don't have access.",
        );
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [room]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage && !file) || !roomId || !userId) return;

    setLoading(true);
    try {
      // If we have a socket connection, emit the message
      if (socket && !file) {
        // For text messages, use socket
        socket.emit("sendMessage", {
          roomId: roomId,
          userId: userId,
          message: newMessage,
        });

        setNewMessage("");
        setLoading(false);
        return;
      }

      // For messages with attachments, use the API
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("message", newMessage);
      formData.append("roomId", roomId);

      if (file) {
        formData.append("attachmentFile", file);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/send-message`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();
      if (data.success) {
        setNewMessage("");
        setFile(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getInitials = (user: User) => {
    return `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`.toUpperCase();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!room) {
    return (
      <div className="flex h-[calc(100vh-150px)] items-center justify-center">
        <div className="text-center">
          {loadingError ? (
            <>
              <p className="mb-4 text-red-500">{loadingError}</p>
              <Button
                variant="outline"
                onClick={() => router.push("/account/my-rooms")}
              >
                Return to Rooms
              </Button>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-neutral-800 border-t-red-600"></div>
              <p className="text-neutral-400">Loading room...</p>
            </>
          )}
        </div>
      </div>
    );
  }

  console.log(room)

  return (
    <div className="flex h-[calc(100vh-150px)] flex-col overflow-hidden rounded-lg border border-neutral-800 bg-black text-white">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-zinc-900 p-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => router.push("/account/my-rooms")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            {room?.adminId?.abator ? (
              <AvatarImage
                src={room.adminId.abator || "/placeholder.svg"}
                alt={`${room.adminId.firstName} ${room.adminId.lastName}`}
              />
            ) : (
              <AvatarFallback>{getInitials(room.adminId)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{room.roomName}</h2>
            <p className="text-xs text-neutral-400">
              With {room.adminId.firstName} {room.adminId.lastName}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Members</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 border-zinc-800 bg-zinc-900 text-white">
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded p-2 hover:bg-zinc-800">
                  <Avatar className="h-8 w-8">
                    {room?.userId?.abator ? (
                      <AvatarImage
                        src={room.userId.abator || "/placeholder.svg"}
                        alt={`${room.userId.firstName} ${room.userId.lastName}`}
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitials(room.userId)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{`${room.userId.firstName} ${room.userId.lastName}`}</p>
                    <p className="text-xs text-zinc-400">
                      {room.userId.userType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded p-2 hover:bg-zinc-800">
                  <Avatar className="h-8 w-8">
                    {room.adminId.abator ? (
                      <AvatarImage
                        src={room.adminId.abator || "/placeholder.svg"}
                        alt={`${room.adminId.firstName} ${room.adminId.lastName}`}
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitials(room.adminId)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{`${room.adminId.firstName} ${room.adminId.lastName}`}</p>
                    <p className="text-xs text-zinc-400">
                      {room.adminId.userType}
                    </p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.userId._id === userId;
            return (
              <div
                key={message._id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} max-w-[80%] gap-2`}
                >
                  <Avatar className="h-10 w-10">
                    {message.userId.abator ? (
                      <AvatarImage
                        src={message.userId.abator || "/placeholder.svg"}
                        alt={`${message.userId.firstName} ${message.userId.lastName}`}
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitials(message.userId)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${isCurrentUser ? "order-2" : "order-1"}`}
                      >
                        {`${message.userId.firstName} ${message.userId.lastName}`}
                      </span>
                      <span
                        className={`text-xs text-zinc-400 ${isCurrentUser ? "order-1" : "order-2"}`}
                      >
                        {formatTime(message.createdAt)}
                      </span>
                    </div>
                    <div
                      className={`mt-1 rounded-lg p-3 ${
                        isCurrentUser
                          ? "rounded-tr-none bg-red-900 text-white"
                          : "rounded-tl-none bg-zinc-800 text-white"
                      }`}
                    >
                      <p>{message.message}</p>
                      {message.attachmentFile && (
                        <div className="mt-2">
                          <a
                            href={message.attachmentFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={message.attachmentFile || "/placeholder.svg"}
                              alt="Attachment"
                              className="max-h-60 rounded-md object-contain"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-neutral-800 bg-zinc-900 p-4"
      >
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {file && (
            <Badge variant="outline" className="gap-1 px-2 py-1">
              {file.name}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => setFile(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Your Message"
            className="flex-1 border-zinc-700 bg-zinc-800 text-white"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || (!newMessage && !file)}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
