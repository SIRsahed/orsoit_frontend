"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function PaymentStats() {
  const stats = [
    { title: "All", value: "120", variant: "default" },
    { title: "Succeed", value: "110", variant: "success" },
    { title: "Refunded", value: "0", variant: "warning" },
    { title: "Failed", value: "0", variant: "danger" },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-[#222] bg-[#1A1A1A]">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
            <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
