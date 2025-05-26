"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUsers, fetchRevenue } from "@/lib/api";

const fetchConversionData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/conversion-ratio`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch conversion data");
  }
  const data = await response.json();
  return data.data;
};
type ConversionEntry = {
  month: string;
  registered: number;
  subscribed: number;
};

export default function DashboardStats() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

  const { data: conversionData } = useQuery({
    queryKey: ["conversionData"],
    queryFn: fetchConversionData,
  });

  let latestSubscribed = 0;

  if (conversionData?.length) {
    const latest = conversionData?.reduce(
      (latest: ConversionEntry, item: ConversionEntry) =>
        item.month > latest.month ? item : latest,
    );
    latestSubscribed = latest.subscribed;
  }

  interface Revenue {
    month: string;
    value: number;
  }

  const { data: revenue, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ["revenue"],
    queryFn: () => fetchRevenue("monthly"),
  });

  const totalRevenue =
    revenue?.data?.reduce(
      (sum: number, item: Revenue) => sum + item.value,
      0,
    ) ?? 0;

  const stats = [
    {
      title: "Total Users",
      value: users?.pagination?.totalUsers || 0,
      icon: Users,
      color: "bg-red-600",
    },
    {
      title: "Monthly Subscribers",
      value: latestSubscribed,
      icon: ShoppingCart,
      color: "bg-red-600",
    },
    {
      title: "Yearly Revenue",
      value: totalRevenue,
      icon: DollarSign,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="overflow-hidden border-[#222] bg-[#1A1A1A]"
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`${stat.color} rounded-full p-3`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              {isLoadingUsers || isLoadingRevenue ? (
                <Skeleton className="h-8 w-24 bg-[#333]" />
              ) : (
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
