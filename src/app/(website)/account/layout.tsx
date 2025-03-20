import type React from "react";
import { AccountSidebar } from "./_components/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mt-[50px] flex flex-1 rounded-xl bg-[#0B0B0B]">
        <AccountSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
