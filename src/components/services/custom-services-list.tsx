"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { MoreHorizontal, Plus } from "lucide-react"
import { fetchCustomServices, approveCustomService, deleteCustomService, fetchUserById } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import AddSubscriptionDialog from "../subscription/add-subscription-dialog"

type CustomService = {
  _id: string
  name: string
  country: string
  fileUpload: string
  description: string
  price: number
  isApprove: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

type UserData = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export default function CustomServicesList() {
  const queryClient = useQueryClient()
  const [selectedService, setSelectedService] = useState<CustomService | null>(null)
  const [actionType, setActionType] = useState<"approve" | "deny" | "delete" | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userCache, setUserCache] = useState<Record<string, UserData>>({})
  const [userLoading, setUserLoading] = useState<Record<string, boolean>>({})
  const [userError, setUserError] = useState<Record<string, boolean>>({})
  const [selectedServiceForPlan, setSelectedServiceForPlan] = useState<string | null>(null)
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const { data: services, isLoading } = useQuery({
    queryKey: ["custom-services"],
    queryFn: fetchCustomServices,
  })

  const approveMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => approveCustomService(id, status),
    onSuccess: () => {
      toast.success(actionType === "approve" ? "Service approved successfully" : "Service denied successfully")
      queryClient.invalidateQueries({ queryKey: ["custom-services"] })
      setIsDialogOpen(false)
    },
    onError: () => {
      toast.error(`Failed to ${actionType} service`)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCustomService(id),
    onSuccess: () => {
      toast.success("Service deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["custom-services"] })
      setIsDialogOpen(false)
    },
    onError: () => {
      toast.error("Failed to delete service")
    },
  })

  const handleAction = (service: CustomService, action: "approve" | "deny" | "delete") => {
    setSelectedService(service)
    setActionType(action)
    setIsDialogOpen(true)
  }

  const confirmAction = () => {
    if (!selectedService) return

    if (actionType === "delete") {
      deleteMutation.mutate(selectedService._id)
    } else {
      approveMutation.mutate({
        id: selectedService._id,
        status: actionType === "approve",
      })
    }
  }

  const fetchUserData = async (userId: string) => {
    setUserLoading((prev) => ({ ...prev, [userId]: true }))
    setUserError((prev) => ({ ...prev, [userId]: false }))

    try {
      const data = await fetchUserById(userId)
      setUserCache((prev) => ({ ...prev, [userId]: data }))
      return data
    } catch (error) {
      setUserError((prev) => ({ ...prev, [userId]: true }))
      console.error("Error fetching user data:", error)
      return null
    } finally {
      setUserLoading((prev) => ({ ...prev, [userId]: false }))
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      if (services?.data) {
        for (const service of services.data) {
          if (!userCache[service.userId] && !userLoading[service.userId] && !userError[service.userId]) {
            await fetchUserData(service.userId)
          }
        }
      }
    }

    fetchInitialData()
  }, [services.data, userCache, userError, userLoading])

  const getUserData = (userId: string) => {
    if (userCache[userId]) {
      return userCache[userId]
    }

    if (userLoading[userId]) {
      return {
        firstName: "Loading...",
        lastName: "",
        email: "Loading...",
        phoneNumber: "",
      }
    }

    if (userError[userId]) {
      return {
        firstName: "Error",
        lastName: "loading",
        email: "Error loading email",
        phoneNumber: "",
      }
    }

    return {
      firstName: "Loading...",
      lastName: "",
      email: "Loading...",
      phoneNumber: "",
    }
  }

  const getFileName = (fileUrl: string) => {
    if (!fileUrl) return "No file"

    // Extract filename from URL
    const urlParts = fileUrl.split("/")
    return urlParts[urlParts.length - 1]
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handlePlanDialogClose = (open: boolean) => {
    setIsPlanDialogOpen(open)
    if (!open) {
      setSelectedServiceForPlan(null)
      setOpenDropdownId(null)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#222] bg-[#1A1A1A]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-[#333] bg-[#0F0F0F]">
              <th className="px-3 py-3 text-left font-medium text-sm lg:px-4">Name</th>
              <th className="px-3 py-3 text-left font-medium text-sm lg:px-4">Email</th>
              <th className="px-3 py-3 text-left font-medium text-sm lg:px-4">Phone</th>
              <th className="px-3 py-3 text-left font-medium text-sm lg:px-4">Country</th>
              <th className="px-3 py-3 text-left font-medium text-sm lg:px-4">Budget</th>
              <th className="px-3 py-3 text-left font-medium text-sm lg:px-4">File</th>
              <th className="px-3 py-3 text-center font-medium text-sm lg:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="animate-pulse border-b border-[#222]">
                    <td className="px-3 py-3 lg:px-4">
                      <Skeleton className="h-4 w-24 bg-[#333] lg:w-32" />
                    </td>
                    <td className="px-3 py-3 lg:px-4">
                      <Skeleton className="h-4 w-32 bg-[#333] lg:w-40" />
                    </td>
                    <td className="px-3 py-3 lg:px-4">
                      <Skeleton className="h-4 w-24 bg-[#333] lg:w-32" />
                    </td>
                    <td className="px-3 py-3 lg:px-4">
                      <Skeleton className="h-4 w-20 bg-[#333] lg:w-24" />
                    </td>
                    <td className="px-3 py-3 lg:px-4">
                      <Skeleton className="h-4 w-16 bg-[#333] lg:w-20" />
                    </td>
                    <td className="px-3 py-3 lg:px-4">
                      <Skeleton className="flex h-4 w-32 items-center bg-[#333] lg:w-48">
                        <div className="ml-1 h-4 w-4 rounded-full bg-[#333]"></div>
                      </Skeleton>
                    </td>
                    <td className="px-3 py-3 text-center lg:px-4">
                      <Skeleton className="mx-auto h-8 w-8 bg-[#333]" />
                    </td>
                  </tr>
                ))
              : services?.data?.map((service: CustomService) => {
                const userData = getUserData(service.userId)
                return (
                  <tr key={service._id} className="border-b border-[#222]">
                    <td className="px-3 py-3 text-sm lg:px-4 lg:text-base">
                      <div className="truncate max-w-[120px] lg:max-w-none">{service.name}</div>
                    </td>
                    <td className="px-3 py-3 text-sm lg:px-4 lg:text-base">
                      <div className="truncate max-w-[150px] lg:max-w-none">{userData?.email || "N/A"}</div>
                    </td>
                    <td className="px-3 py-3 text-sm lg:px-4 lg:text-base">
                      <div className="truncate max-w-[120px] lg:max-w-none">{userData?.phoneNumber || "N/A"}</div>
                    </td>
                    <td className="px-3 py-3 text-sm lg:px-4 lg:text-base">{service.country}</td>
                    <td className="px-3 py-3 text-sm font-medium text-green-400 lg:px-4 lg:text-base">
                      {formatPrice(service.price)}
                    </td>
                    <td className="px-3 py-3 lg:px-4">
                      <a
                        href={service.fileUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:text-blue-400 hover:underline text-sm lg:text-base"
                      >
                        <span className="truncate max-w-[100px] lg:max-w-none">
                          {getFileName(service.fileUpload)}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 h-4 w-4 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    </td>
                    <td className="px-3 py-3 lg:px-4">
                      <div className="flex justify-center">
                        <DropdownMenu
                          open={openDropdownId === service._id}
                          onOpenChange={(open) => {
                            if (open) {
                              setOpenDropdownId(service._id)
                            } else {
                              setOpenDropdownId(null)
                            }
                          }}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-[#333]">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-[#333] bg-[#1A1A1A] text-white w-48">
                            <DropdownMenuItem
                              onClick={() => {
                                handleAction(service, "approve")
                                setOpenDropdownId(null)
                              }}
                              disabled={service.isApprove}
                              className="hover:bg-[#333] focus:bg-[#333] cursor-pointer"
                            >
                              <span className={service.isApprove ? "text-gray-500" : "text-blue-400"}>
                                {service.isApprove ? "Approved" : "Approve"}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleAction(service, "deny")
                                setOpenDropdownId(null)
                              }}
                              disabled={!service.isApprove}
                              className="hover:bg-[#333] focus:bg-[#333] cursor-pointer"
                            >
                              <span className={!service.isApprove ? "text-gray-500" : "text-yellow-400"}>
                                {!service.isApprove ? "Denied" : "Deny"}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                handleAction(service, "delete")
                                setOpenDropdownId(null)
                              }}
                              className="hover:bg-[#333] focus:bg-[#333] cursor-pointer"
                            >
                              <span className="text-red-400">Delete</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedServiceForPlan(service._id)
                                setIsPlanDialogOpen(true)
                                setOpenDropdownId(null)
                              }}
                              className="hover:bg-[#333] focus:bg-[#333] cursor-pointer"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              <span className="text-green-400">Set Plan</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      {selectedServiceForPlan && (
        <AddSubscriptionDialog
          serviceId={selectedServiceForPlan}
          open={isPlanDialogOpen}
          onOpenChange={handlePlanDialogClose}
        />
      )}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="border-[#222] bg-[#1A1A1A] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "approve"
                ? "Approve Custom Service"
                : actionType === "deny"
                  ? "Deny Custom Service"
                  : "Delete Custom Service"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {actionType === "approve"
                ? "Are you sure you want to approve this custom service request?"
                : actionType === "deny"
                  ? "Are you sure you want to deny this custom service request?"
                  : "Are you sure you want to delete this custom service? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#333] bg-transparent">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={actionType === "approve" ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700"}
              onClick={confirmAction}
            >
              {actionType === "approve" ? "Approve" : actionType === "deny" ? "Deny" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
