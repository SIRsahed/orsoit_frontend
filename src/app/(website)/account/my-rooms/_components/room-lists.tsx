"use client";

import { Button } from "@/components/ui/button";
import { fetchUserRooms } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";


interface Room {
  _id: string;
  roomName: string;
  updatedAt: string;
}


export function RoomsList() {
  
  const session = useSession()

  const userId = String(session.data?.user?.id)

  const { data: userRooms } = useQuery({
    queryKey: ["userRooms"],
    queryFn: () => fetchUserRooms(userId)
  });


  if (userRooms?.data?.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-black py-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">
              🏠
            </div>
            <div>
              <h3 className="text-base font-medium text-white">You have no rooms yet</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="space-y-4">
      {userRooms?.data?.map((room: Room) => (
        <div
          key={room._id}
          className="flex items-center justify-between rounded-lg border border-neutral-800 bg-black p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">
              🏠
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Room {room.roomName}</h3>
              <p className="text-base text-neutral-400">
                Manage your space, settings, and preferences
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 space-x-4">
            <div className="text-right">
              <p className="text-xs text-neutral-400">{room.updatedAt}</p>
            </div>
            <Link href={`/account/my-rooms/${room._id}`}>
              <Button variant={"outline"}>Enter Room</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
