"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRevenue } from "@/lib/api";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RevenueChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["revenue"],
    queryFn: () => fetchRevenue("monthly"),
  });

  return (
    <Card className="border-[#222] bg-[#1A1A1A]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-white">
          Total Revenue
        </CardTitle>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] items-center justify-center">
          {isLoading ? (
            <Skeleton className="h-full w-full bg-[#333]" />
          ) : (
            <div className="flex h-full w-full flex-col">
              <div className="text-3xl font-bold text-white">$60</div>
              <div className="relative mt-4 flex-1">
                {/* This would be a real chart in production */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-t from-red-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 border-t border-red-600"></div>
                <div className="absolute bottom-1/4 left-1/4 h-2 w-2 rounded-full bg-red-600"></div>
                <div className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-red-600"></div>
                <div className="absolute bottom-1/2 left-3/4 h-2 w-2 rounded-full bg-red-600"></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-2 text-white">
          <div className="flex items-center justify-between rounded bg-[#222] p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-red-600 text-xs">
                J
              </div>
              <div>
                <p className="font-medium">$585.49</p>
                <p className="text-xs text-gray-400">January</p>
              </div>
            </div>
            <span className="text-red-500">↓ 26%</span>
          </div>

          <div className="flex items-center justify-between rounded bg-[#222] p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-red-600 text-xs">
                F
              </div>
              <div>
                <p className="font-medium">$585.49</p>
                <p className="text-xs text-gray-400">February</p>
              </div>
            </div>
            <span className="text-green-500">↑ 26%</span>
          </div>

          <div className="flex items-center justify-between rounded bg-[#222] p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-red-600 text-xs">
                M
              </div>
              <div>
                <p className="font-medium">$585.49</p>
                <p className="text-xs text-gray-400">March</p>
              </div>
            </div>
            <span className="text-red-500">↓ 26%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
