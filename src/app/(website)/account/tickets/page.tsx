import React from "react";
import { TicketsList } from "./_components/ticket-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="space-y-4">
      <div className="border-b border-neutral-800 pb-4">
        <h1 className="text-2xl font-bold text-primary">Tickets</h1>
      </div>
      <TicketsList />
      <div className="text-end pt-4">
        <Link href="/account/tickets/raise">
          <Button>
            Raise Ticket
            <Plus />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
