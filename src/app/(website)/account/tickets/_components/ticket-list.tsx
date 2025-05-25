"use client"

import { TicketDetailsDialog } from "@/components/tickets/ticket-details-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { fetchUserTickets } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useState } from "react"

interface Ticket {
  _id: string
  issueDetails: string
  createdAt: string
  status: string
  subject: string
}

export function TicketsList() {
  const session = useSession()
  const userId = String(session.data?.user?.id)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState({})

  const { data: userTickets, isLoading: isLoadingUserTickets } = useQuery({
    queryKey: ["userTickets"],
    queryFn: () => fetchUserTickets(userId),
  })

  console.log(userTickets)

  if (isLoadingUserTickets) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-black py-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">🏠</div>
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">🏠</div>
            <div>
              <h3 className="text-base font-medium text-white">You have no tickets yet</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleOpenDialog = (ticket: Ticket) => {
    setDialogOpen(true)
    setSelectedTicket(ticket)
  }

  return (
    <div className="w-full">
      {/* Desktop and Tablet Table View */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-neutral-900">
              <TableRow className="border-none hover:bg-neutral-900">
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Issue</TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Date</TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Status</TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTickets?.data?.map((ticket: Ticket) => (
                <TableRow key={ticket._id} className="border-t border-neutral-800 hover:bg-neutral-900/50">
                  <TableCell className="text-white md:text-sm text-xs">
                    <div className="md:max-w-[300px] max-w-[150px] truncate">{ticket.subject}</div>
                  </TableCell>
                  <TableCell className="text-white md:text-sm text-xs">
                    <div className="md:block hidden">
                      {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      {new Date(ticket.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                    <div className="md:hidden block">
                      {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-white capitalize md:text-sm text-xs">
                    <span className="md:text-sm text-[10px] text-white">
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpenDialog(ticket)}
                      className="bg-transparent md:pl-0 pl-1 text-[#c23636] hover:bg-transparent cursor-pointer md:text-sm text-xs"
                    >
                      <span className="md:inline hidden">View Details</span>
                      <span className="md:hidden inline">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {userTickets?.data?.map((ticket: Ticket) => (
          <Card key={ticket._id} className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm line-clamp-2">{ticket.subject}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-white text-xs">
                      {ticket.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="text-neutral-400">Created:</span>
                  <div className="text-white mt-1">
                    {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-neutral-300 text-xs">
                    {new Date(ticket.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <Button
                  onClick={() => handleOpenDialog(ticket)}
                  variant="ghost"
                  size="sm"
                  className="w-full text-[#c23636] hover:text-[#c23636]/80 hover:bg-neutral-800"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog Component */}
      <TicketDetailsDialog
        // @ts-expect-error typeError
        ticketData={selectedTicket}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  )
}
