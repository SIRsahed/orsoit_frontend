import React from "react";
import { TicketsList } from "./_components/ticket-list";

const page = () => {
  return (
    <div className="space-y-4">
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-bold text-primary">Tickets</h1>
      </div>
      <TicketsList />
    </div>
  );
};

export default page;
