"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchTickets, fetchAdminUsers, assignTicket, createRoom } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function TicketsList() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [currentPage, setCurrentPage] = useState(1) 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [viewTicket, setViewTicket] = useState<any>(null)
  const [selectedAdmin, setSelectedAdmin] = useState("")

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets", currentPage, entriesPerPage],
    queryFn: () => fetchTickets(currentPage, Number.parseInt(entriesPerPage)),
  })

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdminUsers,
  })

  const assignMutation = useMutation({
    mutationFn: ({ ticketId, adminId }: { ticketId: string; adminId: string }) => assignTicket(ticketId, adminId),
    onSuccess: () => {
      toast.success("Admin assigned successfully")
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
    },
    onError: () => {
      toast.error("Failed to assign admin")
    },
  })

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      toast.success("Room created successfully")
      queryClient.invalidateQueries({ queryKey: ["rooms"] })
      router.push(`/rooms/${data.data._id}`)
    },
    onError: () => {
      toast.error("Failed to create room")
    },
  })

  const handleAssignAdmin = () => {
    if (!selectedAdmin || !viewTicket) {
      toast.error("Please select an admin")
      return
    }

    assignMutation.mutate({
      ticketId: viewTicket._id,
      adminId: selectedAdmin,
    })

    // Create a room after assigning admin
    createRoomMutation.mutate({
      userId: viewTicket.userId,
      adminId: selectedAdmin,
      ticketId: viewTicket._id,
    })
  }

  return (
    <>
      <div className="bg-[#1A1A1A] border border-[#222] rounded-lg overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <Select
              value={entriesPerPage}
              onValueChange={(value) => {
                setEntriesPerPage(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-16 bg-[#0F0F0F] border-[#333]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#333]">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search Here..." className="pl-10 bg-[#0F0F0F] border-[#333] w-full md:w-64" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-[#333] bg-[#0F0F0F]">
                <th className="text-left py-3 px-4 font-medium">ID</th>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Rent</th>
                <th className="text-left py-3 px-4 font-medium">Time</th>
                <th className="text-center py-3 px-4 font-medium">Respond</th>
                <th className="text-center py-3 px-4 font-medium">Assign</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="border-b border-[#222] animate-pulse">
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-16"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-24"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-24"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-16"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 bg-[#333] rounded w-16"></div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="h-8 bg-[#333] rounded w-16 mx-auto"></div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="h-8 bg-[#333] rounded w-24 mx-auto"></div>
                      </td>
                    </tr>
                  ))
                : tickets?.data?.map((ticket, index) => (
                  <tr key={ticket._id} className="border-b border-[#222]">
                    <td className="py-3 px-4">#{index + 125}</td>
                    <td className="py-3 px-4">{ticket.name}</td>
                    <td className="py-3 px-4">
                      {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">$125.00</td>
                    <td className="py-3 px-4">10:00 AM</td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="secondary"
                        className="bg-[#0F0F0F] hover:bg-[#1A1A1A]"
                        onClick={() => setViewTicket(ticket)}
                      >
                        View
                      </Button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Select>
                        <SelectTrigger className="w-32 bg-blue-600 text-white border-none">
                          <SelectValue placeholder="Admin" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-[#333]">
                          {admins?.data?.map((admin) => (
                            <SelectItem key={admin._id} value={admin._id}>
                              {admin.firstName} {admin.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex justify-between items-center text-sm">
          <div>
            Showing {tickets?.pagination?.currentPage || 1} to{" "}
            {Math.min(
              (tickets?.pagination?.currentPage || 1) * Number.parseInt(entriesPerPage),
              tickets?.pagination?.totalItems || 0,
            )}{" "}
            of {tickets?.pagination?.totalItems || 0} entries
          </div>

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#0F0F0F] border-[#333] h-8 w-8 p-0"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>

            {Array.from({ length: Math.min(5, tickets?.pagination?.totalPages || 1) }, (_, i) => {
              const pageNumber = i + 1
              return (
                <Button
                  key={pageNumber}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 ${pageNumber === currentPage ? "bg-red-600 border-red-600 text-white" : "bg-[#0F0F0F] border-[#333]"
                    }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}

            <Button
              variant="outline"
              size="sm"
              className="bg-[#0F0F0F] border-[#333] h-8 w-8 p-0"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, tickets?.pagination?.totalPages || 1))}
              disabled={currentPage === (tickets?.pagination?.totalPages || 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>

      {viewTicket && (
        <Dialog open={!!viewTicket} onOpenChange={(open) => !open && setViewTicket(null)}>
          <DialogContent className="bg-[#1A1A1A] border-[#222] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Subject</h3>
                <p className="text-gray-400">{viewTicket.subject}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Name</h3>
                <p className="text-gray-400">{viewTicket.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Service</h3>
                <p className="text-gray-400">{viewTicket.serviceId}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Urgency</h3>
                <p className="text-gray-400 capitalize">{viewTicket.urgency}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Envato Purchase Key</h3>
                <p className="text-gray-400">{viewTicket.envotoPunchesKey}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Issue Details</h3>
                <p className="text-gray-400">{viewTicket.issueDetails}</p>
              </div>

              {viewTicket.attachments && viewTicket.attachments.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Attachments</h3>
                  <div className="flex gap-2">
                    {viewTicket.attachments.map((attachment, index) => (
                      <div key={index} className="bg-[#222] p-2 rounded">
                        <p className="text-xs text-gray-400">ORSO PDF</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#222]">
                <h3 className="text-sm font-medium mb-2">Assign Admin</h3>
                <div className="flex gap-2">
                  <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                    <SelectTrigger className="flex-1 bg-[#0F0F0F] border-[#333]">
                      <SelectValue placeholder="Select Admin" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-[#333]">
                      {admins?.data?.map((admin) => (
                        <SelectItem key={admin._id} value={admin._id}>
                          {admin.firstName} {admin.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={handleAssignAdmin}>
                    Go to Room
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
