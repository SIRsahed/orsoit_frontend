import type { Metadata } from "next";
import CustomServicesList from "@/components/services/custom-services-list";
import DashboardHeader from "@/components/shared/dashboard-header";

export const metadata: Metadata = {
  title: "Custom Services | Orso Solutions",
  description: "Custom services management",
};

export default function CustomServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <h2 className="mb-6 text-2xl font-bold">Custom Services</h2>

        <CustomServicesList />
      </main>
    </div>
  );
}
