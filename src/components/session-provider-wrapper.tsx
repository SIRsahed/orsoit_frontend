"use client";

import type React from "react";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export function SessionProviderWrapper({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}) {
  const [session, setSession] = useState(initialSession);

  // Create a custom event to listen for session updates
  useEffect(() => {
    // Function to handle session update events
    const handleSessionUpdate = (event: CustomEvent) => {
      setSession(event.detail.session);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("session-update" as any, handleSessionUpdate);

    // Clean up event listener
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("session-update" as any, handleSessionUpdate);
    };
  }, []);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
