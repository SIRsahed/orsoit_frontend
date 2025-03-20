import React from "react";
import { RoomsList } from "./_components/room-lists";

const page = () => {
  return (
    <div className="space-y-4">
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-bold text-primary">Rooms</h1>
      </div>
      <RoomsList />
    </div>
  );
};

export default page;
