import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import DashboardHeader from "@/components/shared/dashboard-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orso Solutions",
  description: "Cybersecurity solutions dashboard",
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
          <AppSidebar />
          <div className="flex-1 md:w-[calc(100vw-271.5px)]">
            <div className="sticky top-0 z-10 flex md:ml-[15px]">
              <DashboardHeader />
            </div>
            <div className="">{children}</div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
