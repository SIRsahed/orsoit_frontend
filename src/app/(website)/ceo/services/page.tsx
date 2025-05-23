import type { Metadata } from "next";
import ServicesList from "@/components/services/services-list";
import AddServiceDialog from "@/components/services/add-service-dialog";

export const metadata: Metadata = {
  title: "Services | Orso Solutions",
  description: "Manage cybersecurity services",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Orso Services</h2>
          <AddServiceDialog />
        </div>
        <p className="mb-8 text-gray-400">
          Have questions or need assistance? Our team is here to help! Whether
          you&apos;re looking for cybersecurity solutions, have a security
          concern, or just want to learn more about our services, feel free to
          reach out.
        </p>
        <ServicesList />
      </main>
    </div>
  );
}
