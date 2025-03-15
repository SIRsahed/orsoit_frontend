"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="relative">
      <nav className="fixed top-0 z-50 w-full bg-[#843E3E54]">
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

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-red-500 transition-colors hover:text-red-400"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white transition-colors hover:text-red-400"
            >
              About
            </Link>
            <Link
              href="/service"
              className="text-white transition-colors hover:text-red-400"
            >
              Service
            </Link>
            <Link
              href="/contact"
              className="text-white transition-colors hover:text-red-400"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className="hidden text-sm text-white md:block">
                Alex Rocks
              </span>
              <Avatar>
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
