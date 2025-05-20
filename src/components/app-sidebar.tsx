"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  DoorOpen,
  Users,
  Wrench,
  WrenchIcon as WrenchScrewdriver,
  CreditCard,
  Ticket,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/ceo/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { href: "/ceo/rooms", label: "Rooms", icon: DoorOpen },
    {
      href: "/ceo/user-management",
      label: "User Management",
      icon: Users,
    },
    {
      href: "/ceo/services",
      label: "Services",
      icon: Wrench,
    },
    {
      href: "/ceo/custom-services",
      label: "Custom Services",
      icon: WrenchScrewdriver,
    },
    { href: "/ceo/payment", label: "Payment", icon: CreditCard },
    { href: "/ceo/tickets", label: "Tickets", icon: Ticket },
    {
      href: "/ceo/account-settings",
      label: "Account settings",
      icon: Settings,
    },
    { href: "/ceo/logout", label: "Log out", icon: LogOut },
  ];

  return (
    <Sidebar className="w-[270px] border-none">
      <SidebarHeader className="flex justify-center bg-black p-6">
        <Link
          href="/ceo/dashboard"
          className="flex flex-col items-center gap-1"
        >
          <Image
            src="/orso_logo.png"
            alt="Orso Solutions"
            width={100}
            height={100}
            className="h-[70px] w-[80px]"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-black px-4 py-2">
        <SidebarMenu className="flex list-none flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={`h-12 w-full justify-start rounded-md px-4 py-3 font-medium ${
                    isActive
                      ? "bg-gradient-to-b from-[#D80100] to-[#200C0D] !text-white"
                      : "bg-[#151515] !text-white hover:bg-[#252525]"
                  }`}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
