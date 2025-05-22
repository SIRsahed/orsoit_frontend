import type { Metadata } from "next";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import RevenueChart from "@/components/dashboard/revenue-chart";
import ConversionChart from "@/components/dashboard/conversion-chart";
import RecentSubscriptions from "@/components/dashboard/recent-subscriptions";

export const metadata: Metadata = {
  title: "Dashboard | Orso Solutions",
  description: "Cybersecurity solutions dashboard",
};

export default function DashboardPage() {
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
