"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Cog, Home, LogOut, Bell, CreditCard, Ticket, Menu } from "lucide-react"
import { LogoutDialog } from "@/components/shared/logout-dialog"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

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
]

function SidebarContent() {
  const pathname = usePathname()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="p-6">
      <h2 className="mb-6 text-[26px] font-bold text-white md:text-[30px]">Navigation</h2>
      <nav className="space-y-[10px]">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex h-[45px] w-full items-center rounded-md px-3 py-2 text-base font-medium transition",
                isActive ? "text-white" : "bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white",
              )}
              style={
                isActive
                  ? {
                    background: "linear-gradient(170.34deg, #D80100 -4.69%, #200C0D 97.46%)",
                  }
                  : {}
              }
            >
              <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
              {item.name}
            </Link>
          )
        })}
        <Button
          onClick={() => setDialogOpen(true)}
          className="w-full justify-start bg-neutral-800 hover:bg-neutral-600"
        >
          <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
          Logout
        </Button>
        <LogoutDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
      </nav>
    </div>
  )
}

export function AccountSidebar() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-black w-64 border-r border-neutral-800">
        <SidebarContent />
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-24 right-4 z-50 bg-neutral-800 hover:bg-neutral-700 text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-l border-neutral-800 w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
