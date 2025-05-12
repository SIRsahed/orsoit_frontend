"use client";

import { useSession } from "next-auth/react";
import { Bell, Settings, ChevronDown, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function DashboardHeader() {
  const { data: session } = useSession();

  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    const nameParts = session.user.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };

  return (
    <header className="flex w-full items-center justify-between border-b border-[#222] bg-[#1A0A0A] bg-[#843E3E54] p-4 shadow-[0_4px_12px_0px_#EC747973] backdrop-blur-xl">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center space-x-2">
              <Avatar className="border border-red-600">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-red-900 text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm text-white md:block">
                {session?.user?.name || "User"}
                {session?.user?.role && (
                  <span className="ml-1 text-xs text-red-300">
                    ({session?.user?.role})
                  </span>
                )}
              </span>
              <ChevronDown className="h-4 w-4 text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <User className="h-4 w-4 text-red-700" />
              </div>
              <div className="flex flex-col space-y-1 text-left">
                <p className="text-sm font-medium leading-none">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account-settings" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
