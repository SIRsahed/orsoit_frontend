"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Download, Eye, FileText, ImageIcon, File } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchTickets, fetchAdminUsers, createRoom } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const approveTicket = async (ticketId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tickets/approve/${ticketId}`,
    {
      method: "PUT",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to approve ticket");
  }

  return true;
};

export default function TicketsList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [viewTicket, setViewTicket] = useState<any>(null);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets", currentPage, entriesPerPage],
    queryFn: () => fetchTickets(currentPage, Number.parseInt(entriesPerPage)),
  });

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: fetchAdminUsers,
  });

  // const assignMutation = useMutation({
  //   mutationFn: ({
  //     ticketId,
  //     adminId,
  //   }: {
  //     ticketId: string;
  //     adminId: string;
  //   }) => assignTicket(ticketId, adminId),
  //   onSuccess: () => {
  //     toast.success("Admin assigned successfully");
  //     queryClient.invalidateQueries({ queryKey: ["tickets"] });
  //   },
  // });

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success("Room created successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      router.push(`/ceo/rooms`);
    },
  });

  const handleAssignAdmin = () => {
    if (!selectedAdmin || !viewTicket) {
      toast.error("Please select an admin");
      return;
    }

    setShowConfirmation(true);
  };

  const approveTicketMutation = useMutation({
    mutationFn: approveTicket,
    onSuccess: () => {
      toast.success("Ticket approved successfully");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: () => {
      toast.error("Failed to approve ticket");
    },
  });

  const confirmAssignment = () => {
    setShowConfirmation(false);

    // assignMutation.mutate({
    //   ticketId: viewTicket._id,
    //   adminId: selectedAdmin,
    // });

    // Create a room after assigning admin

    approveTicketMutation.mutate(viewTicket._id);

    createRoomMutation.mutate({
      userId: viewTicket.userId,
      adminId: selectedAdmin,
      ticketId: viewTicket._id,
    });
  };

  // File handling functions
  const getFileIcon = (fileName: string) => {
    if (!fileName) return <File className="h-4 w-4" />;

    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return <ImageIcon className="h-4 w-4" />;
      case "pdf":
        return <FileText className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const getFileType = (fileName: string) => {
    if (!fileName) return "file";

    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return "image";
      case "pdf":
        return "pdf";
      default:
        return "file";
    }
  };

  const handleFileView = (fileName: string) => {
    // Construct the file URL - adjust this based on your file storage setup
    const fileUrl = fileName;

    const fileType = getFileType(fileName);

    if (fileType === "image") {
      // Open image in a new tab
      window.open(fileUrl, "_blank");
    } else if (fileType === "pdf") {
      // Open PDF in a new tab
      window.open(fileUrl, "_blank");
    } else {
      // Download other file types
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-neutral-500/20 text-neutral-400 border-neutral-500/30";
    }
  };


  return (
    <>
      <div className="overflow-hidden rounded-lg border border-[#222] bg-[#1A1A1A]">
        {/* Header Controls */}
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
              <SelectContent className="border-[#333] bg-[#1A1A1A] text-white">
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

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-[#333] bg-[#0F0F0F]">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Subject</th>
                  <th className="px-4 py-3 text-left font-medium">Urgency</th>

                  <th className="px-4 py-3 text-left font-medium">Date</th>
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
                    tickets?.data?.map((ticket: any) => (
                      <tr key={ticket._id} className="border-b border-[#222]">
                        <td className="px-4 py-3">{ticket.name}</td>
                        <td className="px-4 py-3">{ticket.subject}</td>
                        <td className="px-4 py-3">{ticket.urgency}</td>
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
                        <td className="px-4 py-3">
                          {new Date(ticket.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="secondary"
                            className=""
                            onClick={() => setViewTicket(ticket)}
                          >
                            View
                          </Button>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Button
                            variant="default"
                            className="w-32 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => {
                              setViewTicket(ticket);
                              setSelectedAdmin("");
                            }}
                          >
                            Assign Admin
                          </Button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 p-4 md:hidden">
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Card
                    key={i}
                    className="animate-pulse border-[#333] bg-[#0F0F0F]"
                  >
                    <CardContent className="space-y-3 p-4">
                      <div className="flex justify-between">
                        <div className="h-4 w-16 rounded bg-[#333]"></div>
                        <div className="h-4 w-24 rounded bg-[#333]"></div>
                      </div>
                      <div className="h-4 w-32 rounded bg-[#333]"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-16 rounded bg-[#333]"></div>
                        <div className="h-8 w-24 rounded bg-[#333]"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              tickets?.data?.map((ticket: any, index: number) => (
                <Card key={ticket._id} className="border-[#333] bg-[#0F0F0F]">
                  <CardContent className="space-y-3 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          #{index + 125}
                        </h3>
                        <p className="text-sm text-gray-400">{ticket.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white">
                          $125.00
                        </div>
                        <div className="text-xs text-gray-400">10:00 AM</div>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span className="text-gray-400">Date: </span>
                      <span className="text-white">
                        {new Date(ticket.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => setViewTicket(ticket)}
                      >
                        View
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                          setViewTicket(ticket);
                          setSelectedAdmin("");
                        }}
                      >
                        Assign
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 p-4 text-sm sm:flex-row">
          <div className="text-center sm:text-left">
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

      {/* Ticket Details Dialog */}
      {viewTicket && (
        <Dialog
          open={!!viewTicket}
          onOpenChange={(open) => !open && setViewTicket(null)}
        >
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-[#222] bg-[#1A1A1A] text-white">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-lg sm:text-xl">
                Ticket Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 sm:space-y-6">
              {/* Basic Information Grid */}
              <div className="space-y-4">
                <div className="">
                  <h3 className="mb-1 text-sm font-medium">Subject</h3>
                  <p className="break-words text-sm text-gray-400">
                    {viewTicket.subject}
                  </p>
                </div>

                <div className="">
                  <h3 className="mb-1 text-sm font-medium">Name</h3>
                  <p className="text-sm text-gray-400">{viewTicket.name}</p>
                </div>

                <div className="">
                  <h3 className="mb-1 text-sm font-medium">Service</h3>
                  <p className="text-sm text-gray-400">
                    {typeof viewTicket.serviceId === "object"
                      ? viewTicket.serviceId.name
                      : "Unknown Service"}
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium">Urgency</h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      getUrgencyColor(viewTicket.urgency),
                    )}
                  >
                    {viewTicket.urgency}
                  </Badge>
                </div>
              </div>

              {/* Envato Purchase Key */}
              <div>
                <h3 className="mb-1 text-sm font-medium">
                  Envato Purchase Key
                </h3>
                <p className="break-all text-sm text-gray-400">
                  {viewTicket.envotoPunchesKey}
                </p>
              </div>

              {/* Issue Details */}
              <div>
                <h3 className="mb-1 text-sm font-medium">Issue Details</h3>
                <div className="rounded-md border border-[#333] bg-[#0F0F0F] p-3">
                  <p className="text-sm text-gray-400">
                    {viewTicket.issueDetails}
                  </p>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h3 className="mb-2 text-sm font-medium">Attachments</h3>
                {viewTicket.file && viewTicket.file.trim() !== "" ? (
                  <div className="rounded-md border border-[#333] bg-[#0F0F0F] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        {getFileIcon(viewTicket.file)}
                        <span className="truncate text-sm text-gray-400">
                          {viewTicket.file}
                        </span>
                      </div>
                      <div className="flex flex-shrink-0 gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleFileView(viewTicket.file)}
                          className="border-[#333] bg-[#0F0F0F] text-xs text-white hover:bg-[#222]"
                        >
                          {getFileType(viewTicket.file) === "image" ? (
                            <>
                              <Eye className="mr-1 h-3 w-3" />
                              <span className="hidden sm:inline">View</span>
                            </>
                          ) : (
                            <>
                              <Download className="mr-1 h-3 w-3" />
                              <span className="hidden sm:inline">Download</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-md border border-[#333] bg-[#0F0F0F] p-3">
                    <p className="text-sm italic text-gray-500">
                      No file attached
                    </p>
                  </div>
                )}
              </div>

              {/* Admin Assignment */}
              <div className="border-t border-[#222] pt-4">
                <h3 className="mb-3 text-sm font-medium">Assign Admin</h3>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Select
                    value={selectedAdmin}
                    onValueChange={setSelectedAdmin}
                  >
                    <SelectTrigger className="flex-1 border-[#333] bg-[#0F0F0F] text-white">
                      <SelectValue placeholder="Select Admin" />
                    </SelectTrigger>
                    <SelectContent className="border-[#333] bg-[#1A1A1A]">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {admins?.data?.map((admin: any) => (
                        <SelectItem
                          key={admin._id}
                          value={admin._id}
                          className="text-white hover:bg-[#333]"
                        >
                          {admin.firstName} {admin.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
                    onClick={handleAssignAdmin}
                    disabled={!selectedAdmin}
                  >
                    <span className="hidden sm:inline">
                      Assign & Create Room
                    </span>
                    <span className="inline sm:hidden">Assign Admin</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="border-[#222] bg-[#1A1A1A] text-white sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Assignment</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>
                Are you sure you want to assign this ticket to the selected
                admin?
              </p>
              <p className="mt-2 text-sm text-gray-400">
                This will create a new chat room for communication.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-2 sm:flex-row">
              <Button
                variant="outline"
                className="w-full border-[#333] bg-[#0F0F0F] sm:w-auto"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
                onClick={confirmAssignment}
              >
                Confirm & Create Room
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
