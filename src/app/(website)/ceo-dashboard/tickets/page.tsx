import type { Metadata } from "next";
import TicketsList from "@/components/tickets/tickets-list";

export const metadata: Metadata = {
  title: "Tickets | Orso Solutions",
  description: "Ticket management",
};

export default function TicketsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <h2 className="mb-6 text-2xl font-bold">Ticket</h2>
        <TicketsList />
      </main>
    </div>
  );
}
