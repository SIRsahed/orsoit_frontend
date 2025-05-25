"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { LogoutDialog } from "./logout-dialog";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    image: "",
  });

  const isAuthenticated = status === "authenticated";

  // Fetch user data from API

  // Define the function once
  const fetchUserData = useCallback(async () => {
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
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [session]);

  // First effect: Initial fetch on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, fetchUserData]);

  // Second effect: Refetch on profile update via localStorage
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "profile-updated") {
        if (isAuthenticated && session?.user?.id) {
          fetchUserData();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isAuthenticated, session, fetchUserData]);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/service", label: "Service" },
    { href: "/contact-us", label: "Contact Us" },
    ...(session?.user?.role === "customer"
      ? [{ href: "/account", label: "Account" }]
      : []),
  ];

  // Get user initials for avatar fallback
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

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="w-full bg-[#4C0000]/30 shadow-md shadow-orange-700 backdrop-blur-lg">
        <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/orso_logo.png"
                alt="ORSO Solutions"
                className="h-[55px] w-auto"
                height={100}
                width={100}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-red-400 ${isActive(link.href) ? "text-red-500" : "text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile Navigation */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#4C0000]/95 text-white">
                <div className="mt-8 flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium transition-colors hover:text-red-400 ${isActive(link.href) ? "text-red-500" : "text-white"
                        }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile Auth Section */}
                  {!isAuthenticated ? (
                    <Button
                      variant="outline"
                      className="mt-4 border-red-500 text-white hover:bg-red-800 hover:text-white"
                      onClick={() => signIn()}
                    >
                      Login
                    </Button>
                  ) : (
                    <div className="mt-4 space-y-2">
                      {userData.userType === "ceo" ? (
                        <Link
                          href="/ceo/dashboard"
                          className="flex items-center"
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      ) : userData.userType === "admin" ? (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center"
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      ) : userData.userType === "sales" ? (
                          <Link href="/sales" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        )
                        :
                      (
                      <Link href="/account" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      )}
                      <Button
                        onClick={() => setDialogOpen(true)}
                        className="!mt-4 w-full justify-start px-0 bg-transparent"
                      >
                        <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Authentication Section */}
            {!isAuthenticated ? (
              <Button
                variant="outline"
                className="hidden border-red-500 text-white hover:bg-red-800 hover:text-white md:flex"
                onClick={() => signIn()}
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex cursor-pointer items-center space-x-2">
                    <span className="hidden text-sm text-white md:block">
                      {getFullName()}
                      {userData.userType && (
                        <span className="ml-1 text-xs text-red-300">
                          ({userData.userType})
                        </span>
                      )}
                    </span>
                    <Avatar>
                      <AvatarImage
                        src={userData.image || "/avatar.png"}
                        alt={getFullName()}
                      />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-white" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <User className="h-4 w-4 text-red-700" />
                    </div> */}
                    <div className="flex flex-col space-y-1 text-left">
                      <p className="text-sm font-medium leading-none">
                        {getFullName()}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userData.email || session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    {userData.userType === "ceo" ? (
                      <Link href="/ceo/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    ) : userData.userType === "admin" ? (
                      <Link href="/admin/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    ) : (
                      <Link href="/account">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                    <Button
                      onClick={() => setDialogOpen(true)}
                      className="w-full justify-start"
                    >
                      <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>
      <LogoutDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
    </header>
  );
}
