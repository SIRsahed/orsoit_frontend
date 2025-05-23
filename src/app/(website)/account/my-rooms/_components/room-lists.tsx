"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  abator?: string;
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
  lastMessage?: {
    msg: string;
    sender: {
      _id: string;
      firstName: string;
    };
  };
}

// Function to fetch user rooms
const fetchUserRooms = async (userId: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/user?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return response.json();
};

export function RoomsList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const token = session?.user?.accessToken;

  const {
    data: userRooms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userRooms", userId],
    queryFn: () => fetchUserRooms(userId as string, token as string),
    enabled: !!userId && !!token,
  });

  // Function to get room initials for avatar
  const getRoomInitials = (roomName: string) => {
    const words = roomName.split(" ");
    if (words.length >= 2 && words[0] === "Room:") {
      return words[1].substring(0, 2).toUpperCase();
    }
    return roomName.substring(0, 2).toUpperCase();
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-neutral-800 bg-black">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-neutral-800" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-neutral-800" />
                    <Skeleton className="h-3 w-48 bg-neutral-800" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-3 w-16 bg-neutral-800" />
                  <Skeleton className="h-9 w-24 bg-neutral-800" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-black py-10">
        <div className="text-center">
          <p className="text-red-500">Failed to load rooms</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!userRooms?.data || userRooms.data.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-black py-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-white">
              🏠
            </div>
            <div>
              <h3 className="text-base font-medium text-white">
                You have no rooms yet
              </h3>
              <p className="text-sm text-neutral-400">
                Contact support to create a new room
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {userRooms.data.map((room: Room) => (
        <Card
          key={room._id}
          className="flex flex-col items-start justify-between rounded-lg border border-neutral-800 bg-black p-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 bg-neutral-800">
              {room.adminId.abator ? (
                <AvatarImage
                  src={room.adminId.abator || "/placeholder.svg"}
                  alt={room.adminId.firstName}
                />
              ) : (
                <AvatarFallback>
                  {getRoomInitials(room.roomName)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="text-base font-medium text-white">
                {room.roomName}
              </h3>
              <p className="text-sm text-neutral-400">
                {room.lastMessage ? (
                  <>
                    {room.lastMessage.sender._id === userId
                      ? "You"
                      : room.lastMessage.sender.firstName}
                    :{" "}
                    {room.lastMessage.msg.length > 30
                      ? `${room.lastMessage.msg.substring(0, 30)}...`
                      : room.lastMessage.msg}
                  </>
                ) : (
                  "No messages yet"
                )}
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-col items-end gap-3 sm:mt-0">
            <div className="text-right">
              <p className="text-xs text-neutral-400">
                {formatDate(room.updatedAt)}
              </p>
            </div>
            <Link href={`/account/my-rooms/${room._id}`}>
              <Button
                variant="outline"
                className="border-neutral-700 hover:bg-neutral-800"
              >
                Enter Room
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
