"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchUsers, deleteUser } from "@/lib/api"
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

export default function UsersList() {
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", currentPage, entriesPerPage],
    queryFn: () => fetchUsers(currentPage, Number.parseInt(entriesPerPage)),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error) => {
      toast.error("Failed to delete user")
      console.error(error)
    },
  })

  if (error) {
    toast.error("Failed to load users")
  }

  const filteredUsers =
    data?.data?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete)
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
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
            <Input
              placeholder="Search Here..."
              className="pl-10 bg-[#0F0F0F] border-[#333] w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select defaultValue="Network Security">
            <SelectTrigger className="w-full md:w-48 bg-red-600 text-white border-none">
              <SelectValue placeholder="Network Security" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#333]">
              <SelectItem value="Network Security">Network Security</SelectItem>
              <SelectItem value="Cloud Infrastructure">Cloud Infrastructure</SelectItem>
              <SelectItem value="Data Security">Data Security</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-y border-[#333] bg-[#0F0F0F]">
                <th className="text-left py-3 px-4 font-medium">Plan</th>
                <th className="text-left py-3 px-4 font-medium">Username</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-center py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="border-b border-[#222] animate-pulse">
                        <td className="py-3 px-4">
                          <div className="h-4 bg-[#333] rounded w-24"></div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="h-4 bg-[#333] rounded w-32"></div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="h-4 bg-[#333] rounded w-48"></div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="h-8 bg-[#333] rounded w-8 mx-auto"></div>
                        </td>
                      </tr>
                    ))
                : filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-[#222]">
                      <td className="py-3 px-4">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="py-3 px-4">{user.phoneNumber || "-"}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4 text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(user._id)}>
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 flex justify-between items-center text-sm">
          <div>
            Showing {data?.pagination?.currentPage || 1} to{" "}
            {Math.min(
              (data?.pagination?.currentPage || 1) * Number.parseInt(entriesPerPage),
              data?.pagination?.totalItems || 0,
            )}{" "}
            of {data?.pagination?.totalItems || 0} entries
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

            {Array.from({ length: Math.min(5, data?.pagination?.totalPages || 1) }, (_, i) => {
              const pageNumber = i + 1
              return (
                <Button
                  key={pageNumber}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    pageNumber === currentPage ? "bg-red-600 border-red-600 text-white" : "bg-[#0F0F0F] border-[#333]"
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.pagination?.totalPages || 1))}
              disabled={currentPage === (data?.pagination?.totalPages || 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#222] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the user and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#333]">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
