"use client"

import { useSession } from "next-auth/react"
import { Bell, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentHeader() {
  const { data: session } = useSession()

  return (
    <header className="bg-[#1A0A0A] p-4 flex items-center justify-between border-b border-[#222]">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white" asChild>
          <Link href="/account-settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Avatar className="border border-red-600">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className="bg-red-900 text-white">{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{session?.user?.name || "User"}</p>
            <p className="text-xs text-gray-400">{session?.user?.role || "Admin"}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
