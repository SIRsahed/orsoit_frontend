"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUsers, fetchRevenue } from "@/lib/api";

export default function DashboardStats() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });

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
      title: "Total Orders",
      value: "40,225",
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

  console.log(revenue?.data);

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
