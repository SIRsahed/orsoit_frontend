import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

import DashboardHeader from "@/components/shared/dashboard-header";
import { AdminSidebar } from "./_components/admin-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orso Solutions",
  description: "Cybersecurity solutions dashboard",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} bg-[#0F0F0F] text-white`}>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 md:w-[calc(100vw-271.5px)]">
            <div className="sticky top-0 z-10 flex">
              <DashboardHeader />
            </div>
            {children}
          </div>
        </div>
        {/* <Toaster position="top-right" theme="dark" /> */}
      </SidebarProvider>
    </div>
  );
}
