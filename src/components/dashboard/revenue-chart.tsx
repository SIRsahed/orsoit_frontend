"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRevenue } from "@/lib/api";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from "react";

interface Revenue {
  month: string;
  value: number;
}

export default function RevenueChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["revenue"],
    queryFn: () => fetchRevenue("monthly"),
  });

  const chartData = useMemo(() => {
    if (!data?.data) return [];
    return data.data;
  }, [data]);

  const totalRevenue = useMemo(() => {
    if (!chartData.length) return 0;
    return chartData.reduce(
      (sum: number, item: Revenue) => sum + item.value,
      0,
    );
  }, [chartData]);

  return (
    <Card className="flex flex-col border-[#222] bg-[#1A1A1A]">
      {" "}
      {/* Added flex flex-col here */}
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-white">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        {" "}
        {/* Make CardContent flex column and let it grow */}
        <div className="flex min-h-[200px] flex-1 items-center justify-center">
          {" "}
          {/* Removed fixed h-[200px], added min-h */}
          {isLoading ? (
            <Skeleton className="h-full w-full bg-[#333]" />
          ) : (
            <div className="flex h-full w-full flex-col">
              <div className="text-3xl font-bold text-white">
                ${totalRevenue.toFixed(0)}
              </div>
              <div className="relative mt-4 flex-1">
                {" "}
                {/* This flex-1 is crucial for ChartContainer to fill space */}
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(0, 100%, 40%)",
                    },
                  }}
                  className="h-full" // This will now correctly take up the flex-1 space
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#b91c1c"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#b91c1c"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#fff" }}
                        dy={10}
                      />
                      <Tooltip
                        content={
                          <ChartTooltipContent
                            indicator="dot"
                            labelFormatter={(value) => `${value}`}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#b91c1c"
                        strokeWidth={2}
                        fill="url(#colorRevenue)"
                        activeDot={{ r: 6, fill: "#3b82f6" }}
                        dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 h-[150px] overflow-y-auto pr-2">
          {" "}
          {/* Changed to h- and overflow-y-auto for vertical scroll, added pr-2 for scrollbar space */}
          <div className="flex flex-col space-y-2">
            {" "}
            {/* Changed to flex-col and space-y-2 */}
            {!isLoading &&
              chartData.map((item: Revenue) => {
                const fullMonth = getFullMonthName(item.month);
                return (
                  <div
                    key={item.month}
                    className="w-full rounded bg-[#222] p-2" // Changed w-[200px] to w-full
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-red-600 text-xs">
                        {item.month.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          ${item.value.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">{fullMonth}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getFullMonthName(shortMonth: string): string {
  const monthMap: Record<string, string> = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December",
  };

  return monthMap[shortMonth] || shortMonth;
}
