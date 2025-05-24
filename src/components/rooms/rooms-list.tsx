"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Send, Paperclip, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchMessages, sendMessage, closeRoom } from "@/lib/api";
import { useSocket } from "@/providers/socket-provider";
import Link from "next/link";

export default function RoomPage() {
  const { roomId } = useParams();

  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { socket, joinRoom, isConnected } = useSocket();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: messagesData, isLoading } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => fetchMessages(roomId as string),
    enabled: !!roomId,
  });

  console.log(messagesData, "messagesData");

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setMessage("");
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const closeRoomMutation = useMutation({
    mutationFn: closeRoom,
    onSuccess: () => {
      toast.success("Room closed successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      toast.error("Failed to close room");
    },
  });

  useEffect(() => {
    if (isConnected && roomId) {
      joinRoom(roomId as string);

      // Listen for new messages
      socket?.on("receiveMessage", (/* newMessage */) => {
        queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
      });

      return () => {
        socket?.off("receiveMessage");
      };
    }
  }, [isConnected, roomId, socket, joinRoom, queryClient]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);

  const handleSendMessage = () => {
    if (!message.trim() && !file) return;

    if (!session?.user?.id) {
      toast.error("You must be logged in to send messages");
      return;
    }

    sendMessageMutation.mutate({
      userId: session.user.id,
      roomId: roomId as string,
      message: message.trim(),
      attachmentFile: file || undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCloseRoom = () => {
    if (window.confirm("Are you sure you want to close this room?")) {
      closeRoomMutation.mutate(roomId as string);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#0F0F0F]">
      <header className="flex items-center justify-between border-b border-[#222] bg-[#1A0A0A] p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/rooms">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Room ABC</h1>
          <p className="text-sm text-gray-400">25 members, 15 online</p>
        </div>

        <Button variant="destructive" onClick={handleCloseRoom}>
          Close Group
        </Button>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center">
            <p>Loading messages...</p>
          </div>
        ) : messagesData?.data?.length === 0 ? (
          <div className="flex justify-center">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          messagesData?.data?.map((msg: any) => {
            const isCurrentUser = msg.userId._id === session?.user?.id;
            return (
              <div
                key={msg._id}
                className={`message-container ${isCurrentUser ? "items-end" : "items-start"}`}
              >
                <div className="flex items-end gap-2">
                  {!isCurrentUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={msg.userId.abator || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-red-900 text-white">
                        {msg.userId.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`message-bubble ${isCurrentUser ? "sent" : "received"}`}
                  >
                    {!isCurrentUser && (
                      <p className="mb-1 text-xs font-medium">
                        {msg.userId.firstName} {msg.userId.lastName}
                      </p>
                    )}
                    <p>{msg.message}</p>
                    {msg.attachmentFile && (
                      <div className="mt-2">
                        <a
                          href={msg.attachmentFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 underline"
                        >
                          View Attachment
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`message-time ${isCurrentUser ? "text-right" : "text-left"}`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[#222] bg-[#1A1A1A] p-4">
        {file && (
          <div className="mb-2 flex items-center justify-between rounded bg-[#222] p-2">
            <span className="truncate text-sm">{file.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFile(null)}
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              &times;
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-[#222] hover:bg-[#333]"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5" />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
          </Button>
          <Input
            placeholder="Your Message"
            className="border-[#333] bg-[#222]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
