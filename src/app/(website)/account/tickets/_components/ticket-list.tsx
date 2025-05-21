"use client";

import { TicketDetailsDialog } from "@/components/tickets/ticket-details-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserTickets } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";


interface Ticket {
  _id: string;
  issueDetails: string;
  createdAt: string;
  status: string;
}


export function TicketsList() {


  const session = useSession()

  const userId = String(session.data?.user?.id)

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});


  const { data: userTickets, isLoading: isLoadingUserTickets } = useQuery({
    queryKey: ["userTickets"],
    queryFn: () => fetchUserTickets(userId)
  });

  console.log(userTickets)


  if (isLoadingUserTickets) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-black py-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">
              🏠
            </div>
            <div>
              <h3 className="text-base font-medium text-white">Loading tickets</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }


  if (userTickets?.data?.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-black py-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">
              🏠
            </div>
            <div>
              <h3 className="text-base font-medium text-white">You have no tickets yet</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }


  const handleOpenDialog = (ticket: Ticket) => {
    setDialogOpen(true);
    setSelectedTicket(ticket)
  }


  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-neutral-900">
          <TableRow className="border-none hover:bg-neutral-900">
            <TableHead className="font-medium text-neutral-400">
              Issue
            </TableHead>
            <TableHead className="font-medium text-neutral-400">Date</TableHead>
            <TableHead className="font-medium text-neutral-400">
              Status
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userTickets?.data?.map((ticket: Ticket) => (
            <TableRow
              key={ticket._id}
              className="border-t border-neutral-800 hover:bg-neutral-900/50"
            >
              <TableCell className="text-white capitalize truncate">{ticket.issueDetails}</TableCell>
              <TableCell className="text-white">
                {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                {" "}
                {new Date(ticket.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </TableCell>
              <TableCell className="text-white capitalize">{ticket.status}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleOpenDialog(ticket)}
                  className="bg-transparent text-[#c23636] hover:bg-transparent cursor-pointer">
                  View Details
                </Button>
                <TicketDetailsDialog
                  // @ts-expect-error typeError
                  ticketData={selectedTicket}
                  isOpen={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
