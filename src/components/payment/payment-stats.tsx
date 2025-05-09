"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function PaymentStats() {
  const stats = [
    { title: "All", value: "120", variant: "default" },
    { title: "Succeed", value: "110", variant: "success" },
    { title: "Refunded", value: "0", variant: "warning" },
    { title: "Failed", value: "0", variant: "danger" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-[#1A1A1A] border-[#222]">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
