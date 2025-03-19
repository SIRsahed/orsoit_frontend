import type React from "react";
import { AccountSidebar } from "./_components/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1">
        <AccountSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
