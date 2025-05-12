import type { Metadata } from "next";
import RoomsList from "@/components/rooms/rooms-list";

export const metadata: Metadata = {
  title: "Rooms | Orso Solutions",
  description: "Chat rooms",
};

export default function RoomsPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-6">
        <h2 className="mb-6 text-2xl font-bold">Rooms</h2>
        <RoomsList />
      </main>
    </div>
  );
}
