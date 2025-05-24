"use client";

/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { signOut } from "next-auth/react";
import { X } from "lucide-react";

export function LogoutDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-gray-800 bg-[#1A1A1A] p-0 text-white">
        <DialogHeader className="sr-only">
          <DialogTitle>Log Out</DialogTitle>
        </DialogHeader>

        <Card className="relative w-full overflow-hidden border-0 bg-[#1A1A1A] px-16 pb-10 text-white">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 text-gray-400 hover:bg-transparent hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>

          {/* Background circuit pattern */}
          <div className="pointer-events-none absolute right-0 top-14 w-3/5 overflow-hidden">
            <Image
              src="/images/modal_bg.png"
              alt="Modal background"
              width={600}
              height={400}
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* Logo and header */}
          <CardHeader className="relative z-10 flex flex-col items-center pb-6 pt-10 text-center">
            <div className="mb-5">
              <Image
                src="/orso_logo.png"
                alt="Logo"
                width={300}
                height={300}
                className="aspect-auto w-44 object-cover"
              />
            </div>
            <h2 className="mb-2 text-3xl font-bold">
              Are you sure you want to log out?
            </h2>
            <CardDescription className="max-w-md text-center text-base text-[#E6E6E6]">
              <p>
                Don&apos;t be the next target! Stay ahead with the latest
                security tips, updates, and expert insights.
              </p>
            </CardDescription>
          </CardHeader>

          {/* Action buttons */}
          <CardContent className="relative z-10 space-y-6">
            <div className="flex flex-col space-y-7">
              <Button onClick={onClose} className="h-12 text-base font-bold">
                No
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onClose();
                  signOut({ callbackUrl: "/" });
                }}
                className="h-12 border-2 border-b-0 border-red-500 bg-[#323232] text-base font-bold hover:bg-[#323232]/60"
              >
                Yes
              </Button>
            </div>
            <p className="text-center text-base">
              🔒 Your security is our priority!
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
