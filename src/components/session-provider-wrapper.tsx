"use client";

import type React from "react";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export function SessionProviderWrapper({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [session, setSession] = useState(initialSession);

  // Create a custom event to listen for session updates
  useEffect(() => {
    // Function to handle session update events
    const handleSessionUpdate = (event: CustomEvent) => {
      setSession(event.detail.session);
    };

    // Add event listener for session updates
    window.addEventListener("session-update" as any, handleSessionUpdate);

    // Clean up event listener
    return () => {
      window.removeEventListener("session-update" as any, handleSessionUpdate);
    };
  }, []);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
