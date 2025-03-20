import { Button } from "@/components/ui/button";
import Link from "next/link";

const rooms = [
  {
    id: "xyz1",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
  {
    id: "xyz2",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
  {
    id: "xyz3",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
  {
    id: "xyz4",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
  {
    id: "xyz5",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
  {
    id: "xyz6",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
  {
    id: "xyz7",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
  {
    id: "xyz8",
    lastActive: "Feb 28, 2023, 9:30 AM",
  },
];

export function RoomsList() {
  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="flex items-center justify-between rounded-lg border border-neutral-800 bg-black p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">
              🏠
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Room {room.id}</h3>
              <p className="text-base text-neutral-400">
                Manage your space, settings, and preferences
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 space-x-4">
            <div className="text-right">
              <p className="text-xs text-neutral-400">{room.lastActive}</p>
            </div>
            <Link href={`/account/my-rooms/${room.id}`}>
              <Button variant={"outline"}>Enter Room</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
