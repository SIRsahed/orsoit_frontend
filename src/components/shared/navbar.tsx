"use client";

import { useState, useEffect } from "react";
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
import { useSession, signIn, signOut } from "next-auth/react";

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
  const fetchUserData = async () => {
    if (!session?.user?.id || !session?.user?.accessToken) return;

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
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
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [session, isAuthenticated]);

  // Listen for profile update events
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "profile-updated") {
        // Refetch user data when profile is updated
        if (isAuthenticated && session?.user?.id) {
          fetchUserData();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [session, isAuthenticated]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/service", label: "Service" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/account", label: "Account" },
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
                className={`transition-colors hover:text-red-400 ${
                  isActive(link.href) ? "text-red-500" : "text-white"
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
                      className={`text-lg font-medium transition-colors hover:text-red-400 ${
                        isActive(link.href) ? "text-red-500" : "text-white"
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
                      <Link
                        href="/dashboard"
                        className="block text-lg font-medium text-white hover:text-red-400"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full border-red-500 text-white hover:bg-red-800 hover:text-white"
                        onClick={() => signOut()}
                      >
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                      <User className="h-4 w-4 text-red-700" />
                    </div>
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
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
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
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
