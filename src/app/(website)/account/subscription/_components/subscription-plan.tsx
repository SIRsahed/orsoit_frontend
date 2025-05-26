"use client"

import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserSubscriptions } from "@/lib/api"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SubscriptionPlan() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [showConfirmation, setShowConfirmation] = useState(false);


  const { data: userSubscriptions } = useQuery({
    queryKey: ["userSubscriptions"],
    queryFn: () => fetchUserSubscriptions(session?.user.id as string),
    enabled: !!session?.user,
    select: (data) => data.data,
  })

  function formatDateOneMonthLater(dateString: string) {
    const date = new Date(dateString)
    // Add 1 month
    const expires = new Date(date)
    expires.setMonth(expires.getMonth() + 1)

    // Format the new date
    return expires.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const handleUnsubscribe = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ["userSubscriptions"] })
        toast.success(data.message)
      })
  }

  if (userSubscriptions?.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-black py-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white">🏠</div>
            <div>
              <h3 className="text-base font-medium text-white">You have no subscriptions yet</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Desktop and Tablet Table View */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-neutral-900">
              <TableRow className="border-none hover:bg-neutral-900">
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Service</TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Plan</TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs md:table-cell hidden">
                  Activated at
                </TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Expiring In</TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Amount</TableHead>
                <TableHead className="font-medium text-neutral-400 md:text-sm text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {userSubscriptions?.map((plan: any, index: number) => (
                <TableRow key={index} className="border-t border-neutral-800 hover:bg-neutral-900/50">
                  <TableCell className="text-white md:text-sm text-xs">{plan?.services[0]?.serviceId?.name}</TableCell>
                  <TableCell>
                    <span className="inline-block rounded-md px-1.5 py-0.5 text-center md:text-sm text-xs font-medium text-white bg-[linear-gradient(148.79deg,#D80100_7.56%,#EB3E3E_53.78%,#3A0305_100%)]"

                    >
                      {plan?.subscriptionPlanId[0]?.planName}
                    </span>
                  </TableCell>
                  <TableCell className="text-white md:text-sm text-xs md:table-cell hidden">
                    {new Date(plan.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell className="text-white md:text-sm text-xs">
                    {new Date(formatDateOneMonthLater(plan.createdAt)).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      ...(window.innerWidth >= 768 && {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }),
                    })}
                  </TableCell>
                  <TableCell className="text-white md:text-sm text-xs">{plan?.subscriptionPlanId[0]?.price}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => setShowConfirmation(true)}
                      className="md:text-[16px] text-sm text-[#D80100] hover:text-[#D80100]/80"
                    >
                      Unsubscribe
                    </button>
                    <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                      <DialogContent className="border-[#222] bg-[#1A1A1A] text-white sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Confirm Unsubscription</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <p>
                            Are you sure you want to unsubscribe from this plan?
                          </p>
                          <p className="mt-2 text-sm text-gray-400">
                            This action cannot be undone. Please confirm your decision.
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
                            onClick={() => handleUnsubscribe(plan._id)}
                          >
                            Unsubscribe
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {userSubscriptions?.map((plan: any, index: number) => (
          <Card key={index} className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium text-sm">{plan?.services[0]?.serviceId?.name}</h3>
                  <span
                    className={cn(
                      "inline-block mt-1 h-[24px] rounded-md px-2 py-0.5 text-center text-xs font-medium text-white",
                      "bg-[linear-gradient(148.79deg,#D80100_7.56%,#EB3E3E_53.78%,#3A0305_100%)]",
                    )}
                  >
                    {plan?.subscriptionPlanId[0]?.planName}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-sm">{plan?.subscriptionPlanId[0]?.price}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Activated:</span>
                  <span className="text-white">
                    {new Date(plan.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Expires:</span>
                  <span className="text-white">
                    {new Date(formatDateOneMonthLater(plan.createdAt)).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <Button
                  onClick={() => setShowConfirmation(true)}
                  variant="ghost"
                  size="sm"
                  className="w-full text-[#D80100] hover:text-[#D80100]/80 hover:bg-neutral-800"
                >
                  Unsubscribe
                </Button>
                <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                  <DialogContent className="border-[#222] bg-[#1A1A1A] text-white sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Confirm Unsubscription</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p>
                        Are you sure you want to unsubscribe from this plan?
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        This action cannot be undone. Please confirm your decision.
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
                        onClick={() => handleUnsubscribe(plan._id)}
                      >
                        Unsubscribe
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div >
  )
}
