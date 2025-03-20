"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Cog, Home, LogOut, Bell, CreditCard, Ticket } from "lucide-react";

const navigation = [
  {
    name: "My Rooms",
    href: "/account/my-rooms",
    icon: Home,
  },
  {
    name: "Subscription",
    href: "/account/subscription",
    icon: CreditCard,
  },
  {
    name: "Tickets",
    href: "/account/tickets",
    icon: Ticket,
  },
  {
    name: "Notifications",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    name: "Account settings",
    href: "/account/settings",
    icon: Cog,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-black] w-64 border-r border-neutral-800">
      <div className="p-6">
        <h2 className="mb-6 text-[26px] font-bold text-white md:text-[30px]">
          Navigation
        </h2>
        <nav className="space-y-[10px]">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex h-[45px] w-[205px] items-center rounded-md px-3 py-2 text-base font-medium transition",
                  isActive
                    ? "text-white"
                    : "bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white",
                )}
                style={
                  isActive
                    ? {
                        background:
                          "linear-gradient(170.34deg, #D80100 -4.69%, #200C0D 97.46%)",
                      }
                    : {}
                }
              >
                <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
          <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-700 hover:text-white">
            <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
            Log out
          </button>
        </nav>
      </div>
    </div>
  );
}
