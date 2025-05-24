"use client";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserSubscriptions } from "@/lib/api";
import { useSession } from "next-auth/react";
import { toast } from "sonner";


export function SubscriptionPlan() {

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: userSubscriptions } = useQuery({
    queryKey: ["userSubscriptions"],
    queryFn: () => fetchUserSubscriptions(session?.user.id as string),
    enabled: !!session?.user,
    select: (data) => data.data,
  })

  function formatDateOneMonthLater(dateString: string) {
    const date = new Date(dateString);
    // Add 1 month
    const expires = new Date(date);
    expires.setMonth(expires.getMonth() + 1);

    // Format the new date
    return expires.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
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



  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-neutral-900">
          <TableRow className="border-none hover:bg-neutral-900">
            <TableHead className="font-medium text-neutral-400">
              Service
            </TableHead>
            <TableHead className="font-medium text-neutral-400">Plan</TableHead>
            <TableHead className="font-medium text-neutral-400">
              Activated at
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Expiring In
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Amount
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {userSubscriptions?.map((plan: any, index: number) => (
            <TableRow
              key={index}
              className="border-t border-neutral-800 hover:bg-neutral-900/50"
            >
              <TableCell className="text-white">{plan?.services[0]?.serviceId?.name}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-block h-[30px] w-[90px] rounded-md px-2 py-1 text-center text-sm font-medium text-white",
                    plan.plan === "Basic"
                      ? "bg-[#2165FF]" // Solid color for Basic
                      : plan.plan === "Pro"
                        ? "bg-[linear-gradient(170.34deg,#D80100_-4.69%,#200C0D_97.46%)]" // Gradient for Pro
                        : "bg-[linear-gradient(148.79deg,#D80100_7.56%,#EB3E3E_53.78%,#3A0305_100%)]", // Gradient for Enterprise
                  )}
                >
                  {plan?.subscriptionPlanId[0]?.planName}
                </span>
              </TableCell>
              <TableCell className="text-white">
                {new Date(plan.createdAt).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </TableCell>
              <TableCell className="text-white">{formatDateOneMonthLater(plan.createdAt)}</TableCell>
              <TableCell className="text-white">{plan?.subscriptionPlanId[0]?.price}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleUnsubscribe(plan._id)}
                  className="text-[16px] text-[#D80100] hover:text-[#D80100]/80"
                >
                  Unsubscribe
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
