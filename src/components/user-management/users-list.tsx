"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUsers, deleteUser } from "@/lib/api";
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

interface User {
  abator: string; // Assuming 'abator' is a typo and should be 'avatar'
  about: string;
  address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coupons: any[];
  createdAt: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriptions: any[];
  updatedAt: string;
  userType: "customer" | string; //  if there are other possible values
  _id: string;
  __v: number; //  Consider if this is always present
}

export const updateUserType = async (userId: string, userType: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/type`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userType }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update user type");
  }

  return response.json();
};

export default function UsersList() {
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage, entriesPerPage],
    queryFn: () => fetchUsers(currentPage, Number.parseInt(entriesPerPage)),
  });

  console.log(data);

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Failed to delete user");
      console.error(error);
    },
  });

  const updateTypeMutation = useMutation({
    mutationFn: ({ userId, userType }: { userId: string; userType: string }) =>
      updateUserType(userId, userType),
    onSuccess: () => {
      toast.success("User type updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Failed to update user type");
      console.error(error);
    },
  });

  if (error) {
    toast.error("Failed to load users");
  }

  const filteredUsers =
    data?.data?.filter(
      (user: User) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleUserTypeChange = (userId: string, newType: string) => {
    updateTypeMutation.mutate({ userId, userType: newType });
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* <Select defaultValue="Network Security">
            <SelectTrigger className="w-full border-none bg-red-600 text-white md:w-48">
              <SelectValue placeholder="Network Security" />
            </SelectTrigger>
            <SelectContent className="border-[#333] bg-[#1A1A1A]">
              <SelectItem value="Network Security">Network Security</SelectItem>
              <SelectItem value="Cloud Infrastructure">
                Cloud Infrastructure
              </SelectItem>
              <SelectItem value="Data Security">Data Security</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-[#333] bg-[#0F0F0F]">
                <th className="px-4 py-3 text-left font-medium">Plan</th>
                <th className="px-4 py-3 text-left font-medium">Username</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">User Type</th>
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
                          <div className="h-4 w-24 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-4 w-32 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-4 w-48 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="h-4 w-24 rounded bg-[#333]"></div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="mx-auto h-8 w-8 rounded bg-[#333]"></div>
                        </td>
                      </tr>
                    ))
                : filteredUsers.map((user: User) => (
                    <tr key={user._id} className="border-b border-[#222]">
                      <td className="px-4 py-3">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-4 py-3">{user.phoneNumber || "-"}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <Select
                          value={user.userType}
                          onValueChange={(value) =>
                            handleUserTypeChange(user._id, value)
                          }
                        >
                          <SelectTrigger className="w-28 border-[#333] bg-[#0F0F0F]">
                            <SelectValue placeholder={user.userType} />
                          </SelectTrigger>
                          <SelectContent className="border-[#333] bg-[#1A1A1A] text-white">
                            <SelectItem value="ceo">Ceo</SelectItem>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(user._id)}
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 text-sm">
          <div>
            Showing {data?.pagination?.currentPage || 1} to{" "}
            {Math.min(
              (data?.pagination?.currentPage || 1) *
                Number.parseInt(entriesPerPage),
              data?.pagination?.totalItems || 0,
            )}{" "}
            of {data?.pagination?.totalItems || 0} entries
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
              { length: Math.min(5, data?.pagination?.totalPages || 1) },
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
                  Math.min(prev + 1, data?.pagination?.totalPages || 1),
                )
              }
              disabled={currentPage === (data?.pagination?.totalPages || 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-[#222] bg-[#1A1A1A] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              user and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#333] bg-transparent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
