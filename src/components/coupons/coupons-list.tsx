"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCoupons, deleteCoupon, fetchServices } from "@/lib/api";
import CreateCouponDialog from "./create-coupon-dialog";
import EditCouponDialog from "./edit-coupon-dialog";
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

type Coupon = {
  _id: string;
  userID: string;
  title: string;
  discount: number;
  code: string;
  applicableServices: string[];
  activeFrom: string;
  expireIn: string;
  createdAt: string;
  updatedAt: string;
};

export default function CouponsList() {
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: couponsData, isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: fetchCoupons,
  });

  const { data: servicesData } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      toast.success("Coupon deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setDeletingCoupon(null);
    },
    onError: () => {
      toast.error("Failed to delete coupon");
    },
  });

  const handleDelete = (id: string) => {
    setDeletingCoupon(id);
  };

  const confirmDelete = () => {
    if (deletingCoupon) {
      deleteMutation.mutate(deletingCoupon);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditCoupon(coupon);
  };

  // Calculate pagination
  const coupons = couponsData?.data || [];
  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCoupons = coupons.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Find service name by ID
  const getServiceNames = (serviceIds: string[]) => {
    if (!servicesData?.data) return "Loading...";

    const serviceNames = serviceIds.map((id) => {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      const service = servicesData.data.find((s: any) => s._id === id);
      return service ? service.name : "Unknown";
    });

    return serviceNames.join(", ");
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Coupon
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#222] bg-[#1A1A1A]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333] bg-[#0F0F0F]">
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Discount</th>
                <th className="px-4 py-3 text-left font-medium">Code</th>
                <th className="px-4 py-3 text-left font-medium">Service</th>
                <th className="px-4 py-3 text-left font-medium">Active from</th>
                <th className="px-4 py-3 text-left font-medium">Expire in</th>
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
                        <Skeleton className="h-4 w-16 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-6 w-24 rounded-md bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-16 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-24 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-24 bg-[#333]" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <Skeleton className="h-8 w-8 bg-[#333]" />
                          <Skeleton className="h-8 w-8 bg-[#333]" />
                        </div>
                      </td>
                    </tr>
                  ))
                : currentCoupons.map((coupon: Coupon) => (
                  <tr key={coupon._id} className="border-b border-[#222]">
                    <td className="px-4 py-3">{coupon.title}</td>
                    <td className="px-4 py-3">{coupon.discount}% OFF</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-green-900 px-3 py-1 text-xs font-medium text-green-300">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {getServiceNames(coupon.applicableServices)}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(coupon.activeFrom)}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(coupon.expireIn)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(coupon)}
                          className="hover:bg-[#222]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(coupon._id)}
                          className="hover:bg-[#222]"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 0 && (
          <div className="flex items-center justify-between p-4 text-sm">
            <div>
              Showing {startIndex + 1} to {Math.min(endIndex, coupons.length)}{" "}
              of {coupons.length} entries
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

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant="outline"
                    size="sm"
                    className={`h-8 w-8 p-0 ${pageNumber === currentPage
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-[#333] bg-[#0F0F0F]"
                      }`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              {totalPages > 5 && <span className="px-2">...</span>}

              {totalPages > 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 ${totalPages === currentPage
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-[#333] bg-[#0F0F0F]"
                    }`}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 border-[#333] bg-[#0F0F0F] p-0"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create Coupon Dialog */}
      <CreateCouponDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      {/* Edit Coupon Dialog */}
      {editCoupon && (
        <EditCouponDialog
          open={!!editCoupon}
          onOpenChange={(open) => !open && setEditCoupon(null)}
          coupon={editCoupon}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingCoupon}
        onOpenChange={(open) => !open && setDeletingCoupon(null)}
      >
        <AlertDialogContent className="border-[#222] bg-[#1A1A1A] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Coupon</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this coupon? This action cannot be
              undone.
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
