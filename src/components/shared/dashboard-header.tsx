"use client";

import { useState, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    image: "",
    phoneNumber: "",
  });

  // Fetch user data from API
  const fetchUserData = async () => {
    if (!session?.user?.id || !session?.user?.accessToken) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${baseUrl}/single/user/${session.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          userType: data.userType || "",
          image: data.abator || session.user.image || "",
          phoneNumber: data.phoneNumber || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
    }
  }, [session]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStorageChange = (event: any) => {
      if (event.key === "profile-updated") {
        // Refetch user data when profile is updated
        if (session?.user?.id) {
          fetchUserData();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [session]);

  const getUserInitials = () => {
    if (!userData.firstName && !userData.lastName) return "U";
    const firstInitial = userData.firstName ? userData.firstName[0] : "";
    const lastInitial = userData.lastName ? userData.lastName[0] : "";
    return `${firstInitial}${lastInitial}`;
  };

  // Get full name
  const getFullName = () => {
    return (
      `${userData.firstName} ${userData.lastName}`.trim() ||
      session?.user?.name ||
      "User"
    );
  };

  return (
    <header className="flex w-full items-center justify-between border-b border-[#222] bg-[#1A0A0A] bg-[#843E3E54] p-4 shadow-[0_4px_12px_0px_#EC747973] backdrop-blur-xl">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        {/* <Button variant="ghost" size="icon" className="text-white">
          <Bell className="h-5 w-5" />
        </Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center space-x-2">
              <Avatar className="border border-red-600">
                <AvatarImage src={userData.image || ""} />
                <AvatarFallback className="bg-red-900 text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm text-white md:block">
                {getFullName()}
                {userData.userType && (
                  <span className="ml-1 text-xs text-red-300">
                    ({userData.userType})
                  </span>
                )}
              </span>
              <ChevronDown className="h-4 w-4 text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 text-left">
                <p className="text-sm font-medium leading-none">
                  {getFullName()}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData.email || session?.user?.email}
                </p>
              </div>
            </div>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account-settings" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem> */}
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
