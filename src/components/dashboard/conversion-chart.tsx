"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

// Type for the API response
interface ConversionData {
  month: string;
  registered: number;
  subscribed: number;
}

// Function to fetch data from the API
async function fetchConversionData(): Promise<ConversionData[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversion-ratio`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch conversion data");
  }
  const data = await response.json();
  return data.data;
}

// Function to format month string from "YYYY-MM" to "MMM"
function formatMonth(monthStr: string): string {
  const date = new Date(monthStr + "-01"); // Add day to make a valid date
  return date.toLocaleString("default", { month: "short" }).toUpperCase();
}

export default function ConversionChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversionRatio"],
    queryFn: fetchConversionData,
  });

  // Get the latest 6 months of data
  const chartData = data
    ? data
        .map((item) => ({
          month: formatMonth(item.month),
          registered: item.registered,
          subscribed: item.subscribed,
        }))
        .slice(-6) // Get only the latest 6 months
    : [];

  if (isLoading) {
    return (
      <Card className="border-[#222] bg-[#1A1A1A] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">
            Conversion Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[240px] w-full bg-gray-800" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-[#222] bg-[#1A1A1A] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-medium">
            Conversion Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[240px] items-center justify-center">
            <p className="text-red-500">Failed to load conversion data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#222] bg-[#1A1A1A] text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Conversion Ratio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Registered Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Subscribed Users</span>
          </div>
        </div>

        <div className="h-[300px]">
          <ChartContainer
            config={{
              registered: {
                label: "Registered Users",
                color: "hsl(216, 100%, 50%)", // Blue
              },
              subscribed: {
                label: "Subscribed Users",
                color: "hsl(0, 100%, 50%)", // Red
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#333"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                  domain={[0, "auto"]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <Bar
                  dataKey="registered"
                  fill="var(--color-registered)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="subscribed"
                  fill="var(--color-subscribed)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
