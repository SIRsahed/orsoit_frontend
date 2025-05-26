"use client"

import { Bell } from "lucide-react"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { fetchNotification, deleteNotification } from "@/lib/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { format } from "date-fns"
import { useState } from "react"

interface Notification {
  _id: string
  type: "success" | "warning"
  title: string
  message: string
  date: string
  time: string
  createdAt: string
}

export default function NotificationList() {
  const session = useSession()
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: notifications, isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => fetchNotification(session?.data?.user.id as string),
    enabled: !!session?.data?.user?.id,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onMutate: (id: string) => {
      setDeletingId(id)
    },
    onSuccess: () => {
      toast.success("Notification deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      setDeletingId(null)
    },
    onError: (error) => {
      toast.error("Failed to delete notification")
      console.error("Delete notification error:", error)
      setDeletingId(null)
    },
  })

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="w-full">
        {/* Desktop Loading */}
        <div className="hidden sm:block">
          <Table>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i} className="border-t">
                    <TableCell className="p-3 md:p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-700" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-700" />
                          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-700" />
                        </div>
                        <div className="flex-shrink-0">
                          <div className="h-8 w-16 animate-pulse rounded bg-gray-700" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Loading */}
        <div className="sm:hidden space-y-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-700" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center justify-center py-12 text-center px-4">
          <Bell className="h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No notifications</h3>
          <p className="text-sm text-gray-500 max-w-sm">You&apos;re all caught up! No new notifications.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <Table>
          <TableBody>
            {notifications?.map((notification) => (
              <TableRow key={notification._id} className="border-t hover:bg-gray-900">
                <TableCell className="p-3 md:p-4">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                        <Bell className="h-4 w-4 text-yellow-500" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm md:text-base font-medium text-red-500 leading-tight break-words pt-1">
                            {notification.message}
                          </p>
                        </div>

                        <div className="flex-shrink-0 self-start">
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(notification.createdAt), "dd MMM, yyyy | h:mm a")}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-transparent hover:text-red-700 transition-colors px-3 py-1 h-8 text-xs"
                            onClick={() => handleDelete(notification._id)}
                            disabled={deletingId === notification._id}
                          >
                            {deletingId === notification._id ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {notifications?.map((notification) => (
          <Card key={notification._id} className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                    <Bell className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-red-500 leading-tight break-words mb-2">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">{format(new Date(notification.createdAt), "dd MMM, yyyy")}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-transparent hover:text-red-700 transition-colors px-3 py-1 h-8 text-xs"
                      onClick={() => handleDelete(notification._id)}
                      disabled={deletingId === notification._id}
                    >
                      {deletingId === notification._id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
