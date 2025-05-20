"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function SalesSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
    },
    {
      href: "/admin/tickets",
      label: "Tickets",
      icon: ArrowDown,
    },
    {
      href: "/admin/rooms",
      label: "Rooms",
    },
    {
      href: "/admin/account",
      label: "Account",
    },
    {
      href: "/admin/logout",
      label: "Log out",
    },
  ];

  return (
    <Sidebar className="w-[270px] border-none">
      <SidebarHeader className="flex justify-center bg-black p-6">
        <Link
          href="/sales/dashboard"
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
            const isActive = pathname === item.href;
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
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3"
                  >
                    <span>{item.label}</span>
                    {item.icon && <item.icon className="h-4 w-4" />}
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
