import type { Metadata } from "next";
import SessionWrapper from "./session-wrapper";
import LayoutVisibilityWrapper from "@/components/shared/LayoutVisibilityWrapper";
import { QueryProvider } from "@/providers/query-provider";
import { SocketProvider } from "@/providers/socket-provider";
import "../globals.css";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Orso IT",
  description: "Orso IT, the best it service provider",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#000000] antialiased">
        <SessionWrapper>
          <QueryProvider>
            <SocketProvider>
              <LayoutVisibilityWrapper>{children}</LayoutVisibilityWrapper>
            </SocketProvider>
          </QueryProvider>
        </SessionWrapper>
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
