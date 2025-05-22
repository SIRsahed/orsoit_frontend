import ConversionChart from "@/components/dashboard/conversion-chart";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import RecentSubscriptions from "@/components/dashboard/recent-subscriptions";
import RevenueChart from "@/components/dashboard/revenue-chart";
import React from "react";

export default function page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <DashboardStats />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <RevenueChart />
          <ConversionChart />
        </div>

        <RecentSubscriptions />
      </main>
    </div>
  );
}
