"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Paperclip,
  Send,
  Search,
  X,
  ChevronDown,
  Users,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { io, type Socket } from "socket.io-client";

// Update the types
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  userType: string;
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
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
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

export default function ChatPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const token = session?.user?.accessToken;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userId) return;

    const socketInstance = io("http://localhost:5000");

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

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message: any) => {
      console.log("Received message:", message);

      if (selectedRoom && message.roomId === selectedRoom._id) {
        const formattedMessage = {
          _id: message._id || Date.now().toString(),
          roomId: message.roomId,
          userId: {
            _id: message.userId,
            firstName: "User",
            lastName: "",
            phoneNumber: "",
            email: "",
            userType: "",
          },
          message: message.message,
          attachmentFile: message.attachmentFile,
          createdAt: message.createdAt || new Date().toISOString(),
          updatedAt: message.updatedAt || new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, formattedMessage]);
      }

      // Update the room's last message
      setRooms((prevRooms) => {
        const updatedRooms = prevRooms.map((room) => {
          if (room._id === message.roomId) {
            const isCurrentUser = message.userId === userId;
            const unreadCount =
              isCurrentUser || (selectedRoom && selectedRoom._id === room._id)
                ? 0
                : (room.unreadCount || 0) + 1;

            return {
              ...room,
              lastMessage: message.message,
              lastMessageTime: message.createdAt || new Date().toISOString(),
              unreadCount,
            };
          }
          return room;
        });

        // Sort rooms by last message time
        return [...updatedRooms].sort(
          (a, b) =>
            new Date(b.lastMessageTime || b.updatedAt).getTime() -
            new Date(a.lastMessageTime || a.updatedAt).getTime(),
        );
      });

      // Also update filtered rooms
      setFilteredRooms((prevRooms) => {
        const updatedRooms = prevRooms.map((room) => {
          if (room._id === message.roomId) {
            const isCurrentUser = message.userId === userId;
            const unreadCount =
              isCurrentUser || (selectedRoom && selectedRoom._id === room._id)
                ? 0
                : (room.unreadCount || 0) + 1;

            return {
              ...room,
              lastMessage: message.message,
              lastMessageTime: message.createdAt || new Date().toISOString(),
              unreadCount,
            };
          }
          return room;
        });

        // Sort rooms by last message time
        return [...updatedRooms].sort(
          (a, b) =>
            new Date(b.lastMessageTime || b.updatedAt).getTime() -
            new Date(a.lastMessageTime || a.updatedAt).getTime(),
        );
      });
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, selectedRoom, userId]);

  // Join room when selected
  useEffect(() => {
    if (!socket || !selectedRoom) return;

    console.log("Joining room:", selectedRoom._id);
    socket.emit("joinRoom", selectedRoom._id);

    // Mark messages as read
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === selectedRoom._id ? { ...room, unreadCount: 0 } : room,
      ),
    );

    setFilteredRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === selectedRoom._id ? { ...room, unreadCount: 0 } : room,
      ),
    );
  }, [socket, selectedRoom]);

  // Fetch rooms with last messages
  useEffect(() => {
    const fetchRoomsWithLastMessages = async () => {
      if (!token) return;

      try {
        // First fetch all rooms
        const roomsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const roomsData = await roomsResponse.json();

        if (roomsData.success) {
          const roomsWithLastMessages = await Promise.all(
            roomsData.data.map(async (room: Room) => {
              try {
                // Fetch last message for each room
                const messageResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/receive-message?roomId=${room._id}&limit=1`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                const messageData = await messageResponse.json();

                if (messageData.success && messageData.data.length > 0) {
                  const lastMessage = messageData.data[0];
                  return {
                    ...room,
                    lastMessage: lastMessage.message,
                    lastMessageTime: lastMessage.createdAt,
                    unreadCount: 0, // You might want to fetch unread count from an API
                  };
                }

                return room;
              } catch (error) {
                console.error(
                  `Error fetching messages for room ${room._id}:`,
                  error,
                );
                return room;
              }
            }),
          );

          // Sort rooms by last message time (newest first)
          const sortedRooms = roomsWithLastMessages.sort(
            (a: Room, b: Room) =>
              new Date(b.lastMessageTime || b.updatedAt).getTime() -
              new Date(a.lastMessageTime || a.updatedAt).getTime(),
          );

          setRooms(sortedRooms);
          setFilteredRooms(sortedRooms);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    if (token) {
      fetchRoomsWithLastMessages();
    }
  }, [token]);

  // Fetch messages when a room is selected
  useEffect(() => {
    if (selectedRoom && token) {
      fetchMessages(selectedRoom._id);
    }
  }, [selectedRoom, token]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter rooms when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
        room.roomName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredRooms(filtered);
    }
  }, [searchQuery, rooms]);

  const fetchMessages = async (roomId: string) => {
    if (!token) return;

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

        // Update the last message for this room
        if (data.data.length > 0) {
          const lastMsg = data.data[data.data.length - 1];
          const truncatedMessage =
            lastMsg.message.length > 20
              ? lastMsg.message.substring(0, 20) + "..."
              : lastMsg.message;

          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room._id === roomId
                ? {
                    ...room,
                    lastMessage: truncatedMessage,
                    lastMessageTime: lastMsg.createdAt,
                    unreadCount: 0,
                  }
                : room,
            ),
          );

          // Also update filtered rooms
          setFilteredRooms((prevRooms) =>
            prevRooms.map((room) =>
              room._id === roomId
                ? {
                    ...room,
                    lastMessage: truncatedMessage,
                    lastMessageTime: lastMsg.createdAt,
                    unreadCount: 0,
                  }
                : room,
            ),
          );
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage && !file) || !selectedRoom || !userId) return;

    setLoading(true);
    try {
      // If we have a socket connection, emit the message
      if (socket && !file) {
        // For text messages, use socket with the simpler format
        socket.emit("sendMessage", {
          roomId: selectedRoom._id,
          userId: userId, // Just send the ID string, not the full user object
          message: newMessage,
        });

        console.log("Message sent via socket:", {
          roomId: selectedRoom._id,
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
      formData.append("roomId", selectedRoom._id);

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
        // Refresh messages if needed (socket should handle this)
        fetchMessages(selectedRoom._id);
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

  const handleCloseRoom = async () => {
    if (!selectedRoom || !token) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/close-room`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ roomId: selectedRoom._id }),
        },
      );

      const data = await response.json();
      if (data.success) {
        // Remove the room from the list
        const updatedRooms = rooms.filter(
          (room) => room._id !== selectedRoom._id,
        );
        setRooms(updatedRooms);
        setFilteredRooms(
          searchQuery.trim() === ""
            ? updatedRooms
            : updatedRooms.filter((room) =>
                room.roomName.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
        );
        setSelectedRoom(null);
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error("Error closing room:", error);
    }
  };

  const getInitials = (user: User) => {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const getRoomInitials = (roomName: string) => {
    const words = roomName.split(" ");
    if (words.length >= 2 && words[0] === "Room:") {
      return words[1].substring(0, 2).toUpperCase();
    }
    return roomName.substring(0, 2).toUpperCase();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  return (
    <div className="flex h-[calc(100vh-75px)] bg-black text-white">
      {/* Mobile menu button */}
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] border-zinc-800 bg-black p-0"
          >
            {/* Room list for mobile */}
            <div className="flex h-full flex-col">
              <div className="border-b border-zinc-800 p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-400" />
                  <Input
                    placeholder="Search"
                    className="border-zinc-700 bg-zinc-800 pl-9 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2 p-2">
                  {filteredRooms.map((room) => (
                    <Card
                      key={room._id}
                      className={`cursor-pointer transition-colors ${
                        selectedRoom?._id === room._id
                          ? "bg-gradient-to-b from-[#D80100] to-[#200C0D] !text-white"
                          : "bg-[#151515] !text-white hover:bg-[#252525]"
                      }`}
                      onClick={() => {
                        setSelectedRoom(room);
                        setSidebarOpen(false);
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-red-900">
                            <AvatarFallback>
                              {getRoomInitials(room.roomName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="truncate font-medium">
                                {room.roomName}
                              </p>
                              <Badge
                                variant="outline"
                                className="ml-2 border-red-800 bg-red-900 text-white"
                              >
                                {getTimeAgo(
                                  room.lastMessageTime || room.updatedAt,
                                )}
                              </Badge>
                            </div>
                            <p className="truncate text-sm text-zinc-300">
                              You: {room.lastMessage || "No messages yet"}
                            </p>
                          </div>
                        </div>
                        {room.unreadCount && room.unreadCount > 0 && (
                          <Badge className="absolute bottom-3 right-3 bg-red-600 text-white">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
              {selectedRoom && (
                <div className="border-t border-zinc-800 p-4">
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleCloseRoom}
                  >
                    Close Group
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {selectedRoom ? (
          <>
            {/* Chat header */}
            <div className="ml-5 flex items-center justify-between border-b border-zinc-800 bg-zinc-900 p-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {selectedRoom.roomName}
                </h2>
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
                          <AvatarFallback>
                            {getInitials(selectedRoom.userId)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{`${selectedRoom.userId.firstName} ${selectedRoom.userId.lastName}`}</p>
                          <p className="text-xs text-zinc-400">
                            {selectedRoom.userId.userType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded p-2 hover:bg-zinc-800">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {getInitials(selectedRoom.adminId)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{`${selectedRoom.adminId.firstName} ${selectedRoom.adminId.lastName}`}</p>
                          <p className="text-xs text-zinc-400">
                            {selectedRoom.adminId.userType}
                          </p>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCloseRoom}
                  className="hidden md:flex"
                >
                  Close Group
                </Button>
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
                          <AvatarFallback>
                            {getInitials(message.userId)}
                          </AvatarFallback>
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
                                  <img
                                    src={
                                      message.attachmentFile ||
                                      "/placeholder.svg"
                                    }
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
              className="border-t border-zinc-800 bg-zinc-900 p-4"
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
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 text-xl font-semibold">
                Select a room to start chatting
              </h2>
              <p className="text-zinc-400">Choose a room from the sidebar</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                Open Room List
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right sidebar - Room list (desktop only) */}
      <div className="flex hidden w-80 flex-col border-l border-zinc-800 md:flex">
        <div className="border-b border-zinc-800 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-400" />
            <Input
              placeholder="Search"
              className="border-zinc-700 bg-zinc-800 pl-9 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-2 p-2">
            {filteredRooms.map((room) => (
              <Card
                key={room._id}
                className={`cursor-pointer transition-colors ${
                  selectedRoom?._id === room._id
                    ? "bg-gradient-to-b from-[#D80100] to-[#200C0D] !text-white"
                    : "bg-[#151515] !text-white hover:bg-[#252525]"
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <CardContent className="relative p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-red-900">
                      <AvatarFallback>
                        {getRoomInitials(room.roomName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate font-medium">{room.roomName}</p>
                        <Badge
                          variant="outline"
                          className="ml-2 border-red-800 bg-red-900 text-white"
                        >
                          {getTimeAgo(room.lastMessageTime || room.updatedAt)}
                        </Badge>
                      </div>
                      <p className="truncate text-sm text-zinc-300">
                        You: {room.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
                  {room.unreadCount && room.unreadCount > 0 && (
                    <Badge className="absolute bottom-3 right-3 bg-red-600 text-white">
                      {room.unreadCount}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
