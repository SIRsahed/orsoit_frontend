"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchTickets,
  fetchAdminUsers,
  assignTicket,
  createRoom,
} from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function TicketsList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [viewTicket, setViewTicket] = useState<any>(null);
  const [selectedAdmin, setSelectedAdmin] = useState("");

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets", currentPage, entriesPerPage],
    queryFn: () => fetchTickets(currentPage, Number.parseInt(entriesPerPage)),
  });

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdminUsers,
  });

  const assignMutation = useMutation({
    mutationFn: ({
      ticketId,
      adminId,
    }: {
      ticketId: string;
      adminId: string;
    }) => assignTicket(ticketId, adminId),
    onSuccess: () => {
      toast.success("Admin assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: () => {
      toast.error("Failed to assign admin");
    },
  });

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: (data) => {
      toast.success("Room created successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      router.push(`/rooms/${data.data._id}`);
    },
    onError: () => {
      toast.error("Failed to create room");
    },
  });

  const handleAssignAdmin = () => {
    if (!selectedAdmin || !viewTicket) {
      toast.error("Please select an admin");
      return;
    }

    assignMutation.mutate({
      ticketId: viewTicket._id,
      adminId: selectedAdmin,
    });

    // Create a room after assigning admin
    createRoomMutation.mutate({
      userId: viewTicket.userId,
      adminId: selectedAdmin,
      ticketId: viewTicket._id,
    });
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-[#222] bg-[#1A1A1A]">
        <div className="flex flex-col justify-between gap-4 p-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <Select
              value={entriesPerPage}
              onValueChange={(value) => {
                setEntriesPerPage(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-16 border-[#333] bg-[#0F0F0F]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="border-[#333] bg-[#1A1A1A]">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search Here..."
              className="w-full border-[#333] bg-[#0F0F0F] pl-10 md:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-[#333] bg-[#0F0F0F]">
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Rent</th>
                <th className="px-4 py-3 text-left font-medium">Time</th>
                <th className="px-4 py-3 text-center font-medium">Respond</th>
                <th className="px-4 py-3 text-center font-medium">Assign</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr
                        key={i}
                        className="animate-pulse border-b border-[#222]"
                      >
                        <td className="px-4 py-3">
                          <div className="h-4 w-16 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-4 w-24 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-4 w-24 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-4 w-16 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-4 w-16 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="mx-auto h-8 w-16 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="mx-auto h-8 w-24 rounded bg-[#333]"></div>
                        </td>
                      </tr>
                    ))
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tickets?.data?.map((ticket: any, index: number) => (
                    <tr key={ticket._id} className="border-b border-[#222]">
                      <td className="px-4 py-3">#{index + 125}</td>
                      <td className="px-4 py-3">{ticket.name}</td>
                      <td className="px-4 py-3">
                        {new Date(ticket.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-4 py-3">$125.00</td>
                      <td className="px-4 py-3">10:00 AM</td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="secondary"
                          className="bg-[#0F0F0F] hover:bg-[#1A1A1A]"
                          onClick={() => setViewTicket(ticket)}
                        >
                          View
                        </Button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Select>
                          <SelectTrigger className="w-32 border-none bg-blue-600 text-white">
                            <SelectValue placeholder="Admin" />
                          </SelectTrigger>
                          <SelectContent className="border-[#333] bg-[#1A1A1A]">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            admins?.data?.map((admin: any) => (
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

        <div className="flex items-center justify-between p-4 text-sm">
          <div>
            Showing {tickets?.pagination?.currentPage || 1} to{" "}
            {Math.min(
              (tickets?.pagination?.currentPage || 1) *
                Number.parseInt(entriesPerPage),
              tickets?.pagination?.totalItems || 0,
            )}{" "}
            of {tickets?.pagination?.totalItems || 0} entries
          </div>

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 border-[#333] bg-[#0F0F0F] p-0"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>

            {Array.from(
              { length: Math.min(5, tickets?.pagination?.totalPages || 1) },
              (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant="outline"
                    size="sm"
                    className={`h-8 w-8 p-0 ${
                      pageNumber === currentPage
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-[#333] bg-[#0F0F0F]"
                    }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              },
            )}

            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 border-[#333] bg-[#0F0F0F] p-0"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, tickets?.pagination?.totalPages || 1),
                )
              }
              disabled={currentPage === (tickets?.pagination?.totalPages || 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>

      {viewTicket && (
        <Dialog
          open={!!viewTicket}
          onOpenChange={(open) => !open && setViewTicket(null)}
        >
          <DialogContent className="max-w-2xl border-[#222] bg-[#1A1A1A] text-white">
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h3 className="mb-1 text-sm font-medium">Subject</h3>
                <p className="text-gray-400">{viewTicket.subject}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Name</h3>
                <p className="text-gray-400">{viewTicket.name}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Service</h3>
                <p className="text-gray-400">{viewTicket.serviceId}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Urgency</h3>
                <p className="capitalize text-gray-400">{viewTicket.urgency}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">
                  Envato Purchase Key
                </h3>
                <p className="text-gray-400">{viewTicket.envotoPunchesKey}</p>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium">Issue Details</h3>
                <p className="text-gray-400">{viewTicket.issueDetails}</p>
              </div>

              {viewTicket.attachments && viewTicket.attachments.length > 0 && (
                <div>
                  <h3 className="mb-1 text-sm font-medium">Attachments</h3>
                  <div className="flex gap-2">
                    {viewTicket.attachments.map(
                      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                      (attachment: any, index: number) => (
                        <div key={index} className="rounded bg-[#222] p-2">
                          <p className="text-xs text-gray-400">ORSO PDF</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              <div className="border-t border-[#222] pt-4">
                <h3 className="mb-2 text-sm font-medium">Assign Admin</h3>
                <div className="flex gap-2">
                  <Select
                    value={selectedAdmin}
                    onValueChange={setSelectedAdmin}
                  >
                    <SelectTrigger className="flex-1 border-[#333] bg-[#0F0F0F]">
                      <SelectValue placeholder="Select Admin" />
                    </SelectTrigger>
                    <SelectContent className="border-[#333] bg-[#1A1A1A]">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                      admins?.data?.map((admin: any) => (
                        <SelectItem key={admin._id} value={admin._id}>
                          {admin.firstName} {admin.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleAssignAdmin}
                  >
                    Go to Room
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
