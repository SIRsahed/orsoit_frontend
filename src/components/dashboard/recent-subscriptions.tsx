"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RecentSubscriptions() {
  const subscriptions = [
    {
      date: "Mar 03, 2025",
      service: "Penetration Testing",
      plan: "Basic",
      user: "Mobel Potter",
      amount: "$1325.25",
    },
    {
      date: "Mar 03, 2025",
      service: "Penetration Testing",
      plan: "Premium",
      user: "Mobel Potter",
      amount: "$1325.25",
    },
    {
      date: "Mar 03, 2025",
      service: "Penetration Testing",
      plan: "Standard",
      user: "Mobel Potter",
      amount: "$1325.25",
    },
    {
      date: "Mar 03, 2025",
      service: "Penetration Testing",
      plan: "Premium",
      user: "Mobel Potter",
      amount: "$1325.25",
    },
    {
      date: "Mar 03, 2025",
      service: "Penetration Testing",
      plan: "Standard",
      user: "Mobel Potter",
      amount: "$1325.25",
    },
  ];

  return (
    <Card className="mt-6 border-[#222] bg-[#1A1A1A] text-white">
      <CardHeader>
        <CardTitle>Recent Sold Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333]">
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  DATE
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  SERVICE
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  PLAN
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400">
                  USER
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription, index) => (
                <tr key={index} className="border-b border-[#222]">
                  <td className="px-4 py-3">{subscription.date}</td>
                  <td className="px-4 py-3">{subscription.service}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={` ${subscription.plan === "Basic" ? "border-green-700 bg-green-900 text-green-300" : ""} ${subscription.plan === "Standard" ? "border-green-700 bg-green-900 text-green-300" : ""} ${subscription.plan === "Premium" ? "border-gray-700 bg-gray-800 text-gray-300" : ""} `}
                    >
                      {subscription.plan}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{subscription.user}</td>
                  <td className="px-4 py-3 text-right">
                    {subscription.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
