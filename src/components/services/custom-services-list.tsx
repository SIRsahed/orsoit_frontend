"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchCustomServices,
  approveCustomService,
  deleteCustomService,
  fetchUserById,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CustomService = {
  _id: string;
  name: string;
  country: string;
  fileUpload: string;
  description: string;
  price: number;
  isApprove: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export default function CustomServicesList() {
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState<CustomService | null>(
    null,
  );
  const [actionType, setActionType] = useState<
    "approve" | "deny" | "delete" | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userCache, setUserCache] = useState<Record<string, UserData>>({});
  const [userLoading, setUserLoading] = useState<Record<string, boolean>>({});
  const [userError, setUserError] = useState<Record<string, boolean>>({});

  const { data: services, isLoading } = useQuery({
    queryKey: ["custom-services"],
    queryFn: fetchCustomServices,
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) =>
      approveCustomService(id, status),
    onSuccess: () => {
      toast.success(
        actionType === "approve"
          ? "Service approved successfully"
          : "Service denied successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["custom-services"] });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error(`Failed to ${actionType} service`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCustomService(id),
    onSuccess: () => {
      toast.success("Service deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["custom-services"] });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete service");
    },
  });

  const handleAction = (
    service: CustomService,
    action: "approve" | "deny" | "delete",
  ) => {
    setSelectedService(service);
    setActionType(action);
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedService) return;

    if (actionType === "delete") {
      deleteMutation.mutate(selectedService._id);
    } else {
      approveMutation.mutate({
        id: selectedService._id,
        status: actionType === "approve",
      });
    }
  };

  const fetchUserData = async (userId: string) => {
    setUserLoading((prev) => ({ ...prev, [userId]: true }));
    setUserError((prev) => ({ ...prev, [userId]: false }));

    try {
      const data = await fetchUserById(userId);
      setUserCache((prev) => ({ ...prev, [userId]: data }));
      return data;
    } catch (error) {
      setUserError((prev) => ({ ...prev, [userId]: true }));
      console.error("Error fetching user data:", error);
      return null;
    } finally {
      setUserLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchInitialData = async () => {
      if (services?.data) {
        for (const service of services.data) {
          if (
            !userCache[service.userId] &&
            !userLoading[service.userId] &&
            !userError[service.userId]
          ) {
            await fetchUserData(service.userId);
          }
        }
      }
    };

    fetchInitialData();
  }, [services?.data]);

  const getUserData = (userId: string) => {
    if (userCache[userId]) {
      return userCache[userId];
    }

    if (userLoading[userId]) {
      return {
        firstName: "Loading...",
        lastName: "",
        email: "Loading...",
        phoneNumber: "",
      };
    }

    if (userError[userId]) {
      return {
        firstName: "Error",
        lastName: "loading",
        email: "Error loading email",
        phoneNumber: "",
      };
    }

    return {
      firstName: "Loading...",
      lastName: "",
      email: "Loading...",
      phoneNumber: "",
    };
  };

  const getFileName = (fileUrl: string) => {
    if (!fileUrl) return "No file";

    // Extract filename from URL
    const urlParts = fileUrl.split("/");
    return urlParts[urlParts.length - 1];
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#222] bg-[#1A1A1A]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#333] bg-[#0F0F0F]">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Phone</th>
              <th className="px-4 py-3 text-left font-medium">Country</th>
              <th className="px-4 py-3 text-left font-medium">File</th>
              <th className="px-4 py-3 text-center font-medium">Action</th>
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
                        <Skeleton className="h-4 w-32 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-40 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-32 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-24 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="flex h-4 w-48 items-center bg-[#333]">
                          <div className="ml-1 h-4 w-4 rounded-full bg-[#333]"></div>
                        </Skeleton>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Skeleton className="h-8 w-20 bg-[#333]" />
                          <Skeleton className="h-8 w-20 bg-[#333]" />
                        </div>
                      </td>
                    </tr>
                  ))
              : services?.data?.map((service: CustomService) => {
                  const userData = getUserData(service.userId);
                  return (
                    <tr key={service._id} className="border-b border-[#222]">
                      <td className="px-4 py-3">{service.name}</td>
                      <td className="px-4 py-3">{userData?.email || "N/A"}</td>
                      <td className="px-4 py-3">
                        {userData?.phoneNumber || "N/A"}
                      </td>
                      <td className="px-4 py-3">{service.country}</td>
                      <td className="px-4 py-3">
                        <a
                          href={service.fileUpload}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-500 hover:text-blue-400 hover:underline"
                        >
                          {getFileName(service.fileUpload)}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1 h-4 w-4"
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
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => handleAction(service, "approve")}
                            disabled={service.isApprove}
                          >
                            {service.isApprove ? "Approved" : "Approve"}
                          </Button>
                          <Button
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => handleAction(service, "deny")}
                            disabled={!service.isApprove}
                          >
                            {!service.isApprove ? "Denied" : "Deny"}
                          </Button>
                          <Button
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-900/20"
                            onClick={() => handleAction(service, "delete")}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>

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
            <AlertDialogCancel className="border-[#333] bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={
                actionType === "approve"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-600 hover:bg-red-700"
              }
              onClick={confirmAction}
            >
              {actionType === "approve"
                ? "Approve"
                : actionType === "deny"
                  ? "Deny"
                  : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
